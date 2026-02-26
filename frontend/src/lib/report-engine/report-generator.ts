/**
 * Report Generator
 *
 * Orchestrates multi-year report generation with phase grouping.
 */

import {
  AstrologyProfile,
  AstrologyReport,
  ReportDuration,
  ReportPhase,
  YearlyReport,
  DISCLAIMER,
} from "./types";
import { buildYearlyReport } from "./year-builder";
import { calculateCoreNumerology } from "./numerology";
import { getSunSign, getZodiacRelations } from "./zodiac";

const DURATION_LABELS: Record<ReportDuration, string> = {
  1: "1 Year",
  3: "3 Years",
  5: "5 Years",
};

function generatePhases(reports: YearlyReport[]): ReportPhase[] {
  if (reports.length < 5) return [];

  return [
    {
      name: "Setup Phase",
      years: [reports[0].year, reports[1].year],
      summary:
        `The first two years (${reports[0].year}-${reports[1].year}) focus on ` +
        "establishing foundations and preparing for growth. Key themes include " +
        `${reports[0].theme} and ${reports[1].theme} energy patterns.`,
    },
    {
      name: "Growth Phase",
      years: [reports[2].year, reports[3].year],
      summary:
        `Years ${reports[2].year}-${reports[3].year} bring expansion and ` +
        "development. This is the period where earlier groundwork begins to show results.",
    },
    {
      name: "Consolidation Phase",
      years: [reports[4].year],
      summary:
        `${reports[4].year} marks the culmination of this 5-year cycle. ` +
        "Focus on solidifying gains and preparing for the next major cycle.",
    },
  ];
}

export function generateReport(
  profile: AstrologyProfile,
  duration: ReportDuration,
): AstrologyReport {
  const startYear = profile.year;
  const years = Array.from({ length: duration }, (_, i) => startYear + i);

  const reports = years.map((year) => buildYearlyReport(profile, year));
  const phases = duration === 5 ? generatePhases(reports) : undefined;

  const numerology = profile.name
    ? calculateCoreNumerology(profile.dob, profile.name)
    : undefined;

  const sunSign = getSunSign(profile.dob);
  const relations = getZodiacRelations(sunSign);
  const zodiacRelations = {
    friendSigns: relations.friends,
    enemySigns: relations.enemies,
  };

  return {
    duration: DURATION_LABELS[duration],
    years,
    reports,
    phases,
    generatedAt: new Date().toISOString(),
    disclaimer: DISCLAIMER,
    numerology,
    zodiacRelations,
  };
}

export function generateCacheKey(
  profile: AstrologyProfile,
  duration: ReportDuration,
): string {
  const keyParts = [
    profile.dob,
    profile.sunSign,
    profile.moonSign,
    profile.ascendant,
    profile.currentDasha,
    profile.year.toString(),
    duration.toString(),
    JSON.stringify(profile.planetaryHouses),
    JSON.stringify(profile.planetarySigns),
  ];
  const hashString = keyParts.join("|");
  let hash = 0;
  for (let i = 0; i < hashString.length; i++) {
    const char = hashString.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }
  return `report_${Math.abs(hash).toString(36)}`;
}

export function validateProfile(profile: Partial<AstrologyProfile>): string[] {
  const errors: string[] = [];
  if (!profile.dob) errors.push("Date of birth is required");
  if (!profile.sunSign) errors.push("Sun sign is required");
  if (!profile.moonSign) errors.push("Moon sign is required");
  if (!profile.ascendant) errors.push("Ascendant is required");
  if (!profile.currentDasha) errors.push("Current dasha is required");
  if (!profile.year) errors.push("Base year is required");
  if (!profile.planetaryHouses) errors.push("Planetary houses are required");
  if (!profile.planetarySigns) errors.push("Planetary signs are required");
  return errors;
}
