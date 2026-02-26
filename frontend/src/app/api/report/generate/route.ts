import { NextRequest, NextResponse } from "next/server";
import {
  createProfile,
  generateReport,
  generatePrintHTML,
} from "@/lib/report-engine";
import type { ExtendedAstrologyReport } from "@/lib/report-engine";
import { put } from "@vercel/blob";
import { db } from "@/db";
import { reportProfiles, reportHistory } from "@/db/schema";
import { eq, and, sql } from "drizzle-orm";
import { sendReportEmail } from "@/lib/send-email";

/**
 * POST /api/report/generate
 *
 * Flow:
 * 1. Check DB for existing profile (email + DOB) → reuse if < 7 years old
 * 2. If not found or expired → fetch from FreeAstrologyAPI, store in DB
 * 3. Generate report using the consistent profile
 * 4. Upload to Vercel Blob
 * 5. Store report history in DB
 * 6. Send PDF link via email
 * 7. Return response
 */

const ASTROLOGY_API_KEY = process.env.ASTROLOGY_API || "";
const ASTROLOGY_API_BASE = "https://json.freeastrologyapi.com";
const PROFILE_EXPIRY_YEARS = 7;

// ─── FreeAstrologyAPI Helpers ───────────────────────────────────────

async function fetchPlanetaryData(
  year: number,
  month: number,
  day: number,
  hour: number,
  minute: number,
  lat: number,
  lon: number,
  tz: number,
) {
  const body = {
    year,
    month,
    date: day,
    hours: hour,
    minutes: minute,
    seconds: 0,
    latitude: lat,
    longitude: lon,
    timezone: tz,
    settings: { observation_point: "topocentric", ayanamsha: "lahiri" },
  };
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": ASTROLOGY_API_KEY,
  };

  const [planetsRes, ascRes, dashaRes] = await Promise.all([
    fetch(`${ASTROLOGY_API_BASE}/v1/planets`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }),
    fetch(`${ASTROLOGY_API_BASE}/v1/ascendant`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }),
    fetch(`${ASTROLOGY_API_BASE}/v1/currentVimDasha`, {
      method: "POST",
      headers,
      body: JSON.stringify(body),
    }),
  ]);

  return {
    planetsData: planetsRes.ok ? await planetsRes.json() : null,
    ascData: ascRes.ok ? await ascRes.json() : null,
    dashaData: dashaRes.ok ? await dashaRes.json() : null,
  };
}

function mapPlanetsToProfile(planetsData: Record<string, unknown> | null) {
  const planetaryHouses: Record<string, number> = {};
  const planetarySigns: Record<string, string> = {};
  let sunSign = "aries";
  let moonSign = "aries";

  if (planetsData && typeof planetsData === "object") {
    const planetKeys = [
      "Sun",
      "Moon",
      "Mars",
      "Mercury",
      "Jupiter",
      "Venus",
      "Saturn",
      "Rahu",
      "Ketu",
    ];
    const signs = [
      "aries",
      "taurus",
      "gemini",
      "cancer",
      "leo",
      "virgo",
      "libra",
      "scorpio",
      "sagittarius",
      "capricorn",
      "aquarius",
      "pisces",
    ];

    for (const key of planetKeys) {
      const planet = planetsData[key] as Record<string, unknown> | undefined;
      if (!planet) continue;
      const name = key.toLowerCase();
      if (typeof planet.house_number === "number")
        planetaryHouses[name] = planet.house_number;
      if (typeof planet.zodiac_sign_name === "string")
        planetarySigns[name] = planet.zodiac_sign_name.toLowerCase();
      if (typeof planet.current_sign === "number") {
        const idx = (planet.current_sign as number) - 1;
        if (idx >= 0 && idx < 12) planetarySigns[name] = signs[idx];
      }
    }
    sunSign = planetarySigns.sun || "aries";
    moonSign = planetarySigns.moon || "aries";
  }

  return { planetaryHouses, planetarySigns, sunSign, moonSign };
}

// ─── Profile expiry check ───────────────────────────────────────────

function isProfileExpired(generatedAt: Date): boolean {
  const now = new Date();
  const diffMs = now.getTime() - generatedAt.getTime();
  const diffYears = diffMs / (365.25 * 24 * 60 * 60 * 1000);
  return diffYears >= PROFILE_EXPIRY_YEARS;
}

// ─── Main Handler ───────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      firstName,
      lastName,
      email,
      dateOfBirth,
      timeOfBirth,
      birthPlace,
      duration = 1,
      latitude: inputLat,
      longitude: inputLon,
      timezoneOffset: inputTz,
    } = body;

    if (!firstName || !dateOfBirth || !email) {
      return NextResponse.json(
        { error: "Missing required fields (firstName, dateOfBirth, email)" },
        { status: 400 },
      );
    }

    const { day, month, year } = dateOfBirth;
    const {
      hour: rawHour,
      minute,
      amPm,
    } = timeOfBirth || { hour: 12, minute: 0, amPm: "PM" };

    let hour24 = parseInt(rawHour) || 12;
    if (amPm === "PM" && hour24 !== 12) hour24 += 12;
    if (amPm === "AM" && hour24 === 12) hour24 = 0;

    const monthNum =
      typeof month === "number"
        ? month
        : [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ].indexOf(month) + 1 || 1;

    const dob = `${year}-${String(monthNum).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    const fullName = `${firstName} ${lastName || ""}`.trim();
    const emailLower = email.toLowerCase().trim();

    const lat = typeof inputLat === "number" ? inputLat : 28.6139;
    const lon = typeof inputLon === "number" ? inputLon : 77.209;
    const tz = typeof inputTz === "number" ? inputTz : 5.5;

    // ─── Step 1: Check for existing profile ─────────────────────

    let sunSign = "aries";
    let moonSign = "aries";
    let ascendant = "aries";
    let currentDasha = "Saturn";
    let planetaryHouses: Record<string, number> = {};
    let planetarySigns: Record<string, string> = {};
    let profileId: number | null = null;
    let usedCachedProfile = false;

    // ─── Fetch fresh data from API ───────────────────────────
    if (ASTROLOGY_API_KEY) {
      try {
        const { planetsData, ascData, dashaData } = await fetchPlanetaryData(
          parseInt(year),
          monthNum,
          parseInt(day),
          hour24,
          parseInt(minute) || 0,
          lat,
          lon,
          tz,
        );

        const mapped = mapPlanetsToProfile(
          planetsData as Record<string, unknown> | null,
        );
        planetaryHouses = mapped.planetaryHouses;
        planetarySigns = mapped.planetarySigns;
        sunSign = mapped.sunSign;
        moonSign = mapped.moonSign;

        if (ascData && typeof ascData === "object") {
          const ascObj = ascData as Record<string, unknown>;
          if (typeof ascObj.ascendant === "string")
            ascendant = ascObj.ascendant.toLowerCase();
          else if (typeof ascObj.zodiac_sign_name === "string")
            ascendant = ascObj.zodiac_sign_name.toLowerCase();
        }

        if (dashaData && typeof dashaData === "object") {
          const dashaObj = dashaData as Record<string, unknown>;
          if (typeof dashaObj.major === "string") currentDasha = dashaObj.major;
          else if (typeof dashaObj.mahadasha === "string")
            currentDasha = dashaObj.mahadasha;
        }
      } catch (apiError) {
        console.error("FreeAstrologyAPI error (using defaults):", apiError);
      }
    }

    // ─── Upsert profile in DB ────────────────────────────────
    try {
      const inserted = await db
        .insert(reportProfiles)
        .values({
          email: emailLower,
          name: fullName,
          dob,
          birthPlace: birthPlace || null,
          latitude: lat,
          longitude: lon,
          timezoneOffset: tz,
          sunSign,
          moonSign,
          ascendant,
          currentDasha,
          planetaryHouses,
          planetarySigns,
          generatedAt: new Date(),
        })
        .onConflictDoUpdate({
          target: [reportProfiles.email, reportProfiles.dob],
          set: {
            name: fullName,
            birthPlace: birthPlace || null,
            latitude: lat,
            longitude: lon,
            timezoneOffset: tz,
            sunSign,
            moonSign,
            ascendant,
            currentDasha,
            planetaryHouses,
            planetarySigns,
            generatedAt: new Date(),
          },
        })
        .returning({ id: reportProfiles.id });
      profileId = inserted[0]?.id ?? null;
    } catch (dbError) {
      console.error("DB profile save error:", dbError);
    }

    // ─── Step 2: Generate report ──────────────────────────────────

    const profile = createProfile({
      dob,
      name: fullName,
      sunSign,
      moonSign,
      ascendant,
      planetaryHouses,
      planetarySigns,
      currentDasha,
      year: new Date().getFullYear(),
    });

    const validDuration = ([1, 3, 5].includes(duration) ? duration : 1) as
      | 1
      | 3
      | 5;
    const report = generateReport(profile, validDuration);

    const extendedReport: ExtendedAstrologyReport = {
      ...report,
      profile,
      name: fullName,
      birthDetails: {
        date: `${day} ${month} ${year}`,
        time: `${rawHour}:${String(minute).padStart(2, "0")} ${amPm}`,
        location: birthPlace || "Not specified",
      },
    };

    const html = generatePrintHTML(extendedReport);

    // ─── Step 3: Upload to Vercel Blob ────────────────────────────

    let blobUrl: string | null = null;
    try {
      const timestamp = Date.now();
      const safeName = fullName.replace(/[^a-zA-Z0-9]/g, "_").toLowerCase();
      const filename = `reports/${safeName}_${validDuration}yr_${timestamp}.html`;
      const blob = await put(filename, html, {
        access: "public",
        contentType: "text/html",
      });
      blobUrl = blob.url;
    } catch (blobError) {
      console.error("Vercel Blob upload error:", blobError);
    }

    // ─── Step 4: Store report history in DB ───────────────────────

    try {
      if (profileId) {
        await db.insert(reportHistory).values({
          profileId,
          duration: validDuration,
          blobUrl,
          reportData: {
            duration: report.duration,
            years: report.years,
            generatedAt: report.generatedAt,
          },
        });
      }
    } catch (historyError) {
      console.error("DB report history save error:", historyError);
    }

    // ─── Step 5: Send email ───────────────────────────────────────

    let emailSent = false;
    if (blobUrl) {
      try {
        emailSent = await sendReportEmail({
          to: emailLower,
          name: fullName,
          blobUrl,
          duration: report.duration,
          years: report.years,
          generatedAt: report.generatedAt,
        });

        // Update history with email sent timestamp
        if (emailSent && profileId) {
          const histories = await db
            .select({ id: reportHistory.id })
            .from(reportHistory)
            .where(eq(reportHistory.profileId, profileId))
            .limit(1);
          if (histories[0]) {
            await db
              .update(reportHistory)
              .set({ emailSentAt: new Date() })
              .where(eq(reportHistory.id, histories[0].id));
          }
        }
      } catch (emailError) {
        console.error("Email send error:", emailError);
      }
    }

    // ─── Step 6: Return response ──────────────────────────────────

    return NextResponse.json({
      html,
      blobUrl,
      emailSent,
      usedCachedProfile,
      report: {
        duration: report.duration,
        years: report.years,
        generatedAt: report.generatedAt,
      },
    });
  } catch (error: unknown) {
    console.error("Error generating report:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate report";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
