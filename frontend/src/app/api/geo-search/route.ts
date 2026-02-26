import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/geo-search
 *
 * Proxies the FreeAstrologyAPI geo-details endpoint to provide
 * autocomplete suggestions for birth place. Keeps API key server-side.
 */

const ASTROLOGY_API_KEY = process.env.ASTROLOGY_API || "";

export async function POST(req: NextRequest) {
  try {
    const { location } = await req.json();

    if (
      !location ||
      typeof location !== "string" ||
      location.trim().length < 2
    ) {
      return NextResponse.json([]);
    }

    const res = await fetch("https://json.freeastrologyapi.com/geo-details", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": ASTROLOGY_API_KEY,
      },
      body: JSON.stringify({ location: location.trim() }),
    });

    if (!res.ok) {
      console.error("Geo API error:", res.status);
      return NextResponse.json([]);
    }

    const data = await res.json();

    // Normalize the response — API returns an array
    const results = Array.isArray(data) ? data : [];

    return NextResponse.json(
      results.map((r: Record<string, unknown>) => ({
        name: r.location_name || location,
        completeName: Array.from(
          new Set(
            String(r.complete_name || r.location_name || location)
              .split(",")
              .map((s) => s.trim()),
          ),
        ).join(", "),
        latitude: r.latitude || 0,
        longitude: r.longitude || 0,
        timezoneOffset: r.timezone_offset || 5.5,
        timezone: r.timezone || "Asia/Kolkata",
        country: r.country || "",
      })),
    );
  } catch (error) {
    console.error("Geo search error:", error);
    return NextResponse.json([]);
  }
}
