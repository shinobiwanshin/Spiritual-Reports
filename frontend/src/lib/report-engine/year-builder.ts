/**
 * Yearly Report Builder
 *
 * Builds a single year's predictions by orchestrating all rule evaluators,
 * combining their outputs, and generating 12-month breakdowns.
 */

import {
  AstrologyProfile,
  YearlyReport,
  MonthlyPrediction,
  MONTH_NAMES,
} from "./types";
import { getYearTheme } from "./themes";
import {
  evaluateCareer,
  generateCareerPrediction,
  getMonthlyCareerPrediction,
} from "./rules/career-rules";
import {
  evaluateFinance,
  generateFinancePrediction,
  getMonthlyFinancePrediction,
} from "./rules/finance-rules";
import {
  evaluateHealth,
  generateHealthPrediction,
  getMonthlyHealthPrediction,
} from "./rules/health-rules";
import {
  evaluateFamily,
  generateFamilyPrediction,
  getMonthlyFamilyPrediction,
} from "./rules/family-rules";
import {
  evaluateLove,
  generateLovePrediction,
  getMonthlyLovePrediction,
} from "./rules/love-rules";
import { calculatePersonalYearPrediction } from "./numerology";

/**
 * Generate advice based on the year's theme and dominant factors.
 */
function generateAdvice(
  profile: AstrologyProfile,
  year: number,
  themeKey: string,
): string {
  const adviceBlocks: string[] = [];

  switch (themeKey) {
    case "foundation":
      adviceBlocks.push(
        "Focus on building sustainable routines and habits that will support your long-term growth.",
      );
      adviceBlocks.push(
        "Patience and consistency will yield the best results this year. Avoid rushing important decisions.",
      );
      adviceBlocks.push(
        "Invest in your personal and professional foundations — the work you do now creates lasting stability.",
      );
      break;
    case "growth":
      adviceBlocks.push(
        "Embrace new opportunities with an open mind and a willingness to step outside your comfort zone.",
      );
      adviceBlocks.push(
        "This is an excellent year for learning, personal development, and expanding your horizons.",
      );
      adviceBlocks.push(
        "Say yes to experiences that challenge you — growth happens at the edge of what you know.",
      );
      break;
    case "intensity":
      adviceBlocks.push(
        "Channel your energy into focused, purposeful action. Prioritize your most important goals.",
      );
      adviceBlocks.push(
        "Hard work during this period creates lasting achievements that define your trajectory.",
      );
      adviceBlocks.push(
        "Manage stress through healthy outlets — the demands are high, but so are the potential rewards.",
      );
      break;
    case "transition":
      adviceBlocks.push(
        "Stay flexible as circumstances evolve around you. Change is natural and often beneficial.",
      );
      adviceBlocks.push(
        "Embrace transitions as opportunities for renewal and reinvention.",
      );
      adviceBlocks.push(
        "Let go of what no longer serves you — making space for the new is essential during this phase.",
      );
      break;
    case "harvest":
      adviceBlocks.push(
        "Enjoy the fruits of your past efforts with gratitude and mindful appreciation.",
      );
      adviceBlocks.push(
        "Express gratitude while planning wisely for future cycles.",
      );
      adviceBlocks.push(
        "Share your success and wisdom with others — generosity amplifies your harvest.",
      );
      break;
  }

  const dashaLower = profile.currentDasha.toLowerCase();
  if (dashaLower.includes("saturn")) {
    adviceBlocks.push(
      "Maintain discipline and respect responsibilities. Saturn rewards consistency and ethical conduct.",
    );
  } else if (dashaLower.includes("jupiter")) {
    adviceBlocks.push(
      "Seek wisdom through teachers and ethical guidance. Jupiter's blessings multiply through righteous living.",
    );
  } else if (dashaLower.includes("mars")) {
    adviceBlocks.push(
      "Channel energy constructively; avoid unnecessary conflicts. Physical exercise helps manage Mars's intense energy.",
    );
  } else if (dashaLower.includes("venus")) {
    adviceBlocks.push(
      "Cultivate beauty and harmony in your surroundings. Creative expression brings joy and meaningful breakthroughs.",
    );
  } else if (dashaLower.includes("mercury")) {
    adviceBlocks.push(
      "Improve communication skills and stay mentally active. Continuous learning is your greatest asset during this period.",
    );
  }

  return adviceBlocks.join(" ");
}

/**
 * Generate overall tone for a month based on planetary ruler interaction.
 */
function getMonthlyTone(month: number, themeKey: string): string {
  const toneMap: Record<string, string[]> = {
    foundation: [
      "Steady and grounding",
      "Patient and constructive",
      "Energized planning",
      "Active building",
      "Harmonious growth",
      "Analytical progress",
      "Intuitive reflection",
      "Confident execution",
      "Detailed preparation",
      "Balanced foundations",
      "Expanding wisdom",
      "Grateful completion",
    ],
    growth: [
      "Fresh momentum",
      "Cooperative expansion",
      "Bold new starts",
      "Energetic progress",
      "Creative flourishing",
      "Intellectual breakthroughs",
      "Emotional deepening",
      "Confident growth",
      "Refined development",
      "Harmonious advancement",
      "Expansive learning",
      "Reflective integration",
    ],
    intensity: [
      "Focused determination",
      "Strategic patience",
      "Powerful action",
      "Relentless drive",
      "Elegant intensity",
      "Sharp execution",
      "Emotional depth",
      "Commanding presence",
      "Meticulous achievement",
      "Balanced power",
      "Wise ambition",
      "Culminating effort",
    ],
    transition: [
      "Adaptive restructuring",
      "Patient transformation",
      "Bold shifts",
      "Dynamic changes",
      "Graceful evolution",
      "Communicative transitions",
      "Emotional release",
      "Confident renewal",
      "Analytical reassessment",
      "Balanced adaptation",
      "Expansive shifts",
      "Reflective closure",
    ],
    harvest: [
      "Rewarding start",
      "Grateful continuity",
      "Energized celebration",
      "Active reaping",
      "Beautiful rewards",
      "Articulating success",
      "Emotional fulfillment",
      "Proud recognition",
      "Organized abundance",
      "Balanced satisfaction",
      "Generous sharing",
      "Grateful reflection",
    ],
  };

  const tones = toneMap[themeKey] || toneMap.foundation;
  return tones[month - 1] || "Balanced progress";
}

/**
 * Build monthly breakdowns for a year.
 */
function buildMonthlyBreakdowns(
  profile: AstrologyProfile,
  year: number,
  themeKey: string,
): MonthlyPrediction[] {
  const months: MonthlyPrediction[] = [];

  for (let m = 1; m <= 12; m++) {
    months.push({
      month: m,
      monthName: MONTH_NAMES[m - 1],
      career: getMonthlyCareerPrediction(profile, year, m),
      finance: getMonthlyFinancePrediction(profile, year, m),
      health: getMonthlyHealthPrediction(profile, year, m),
      family: getMonthlyFamilyPrediction(profile, year, m),
      love: getMonthlyLovePrediction(profile, year, m),
      overallTone: getMonthlyTone(m, themeKey),
    });
  }

  return months;
}

/**
 * Build a complete yearly report for a single year.
 */
export function buildYearlyReport(
  profile: AstrologyProfile,
  year: number,
): YearlyReport {
  const theme = getYearTheme(year, profile.currentDasha);
  const numerology = calculatePersonalYearPrediction(profile.dob, year);

  const careerResult = evaluateCareer(profile, year, numerology.personalYear);
  const financeResult = evaluateFinance(profile, year, numerology.personalYear);
  const healthResult = evaluateHealth(profile, year, numerology.personalYear);
  const familyResult = evaluateFamily(profile, year, numerology.personalYear);
  const loveResult = evaluateLove(profile, year, numerology.personalYear);

  const career = generateCareerPrediction(careerResult);
  const finance = generateFinancePrediction(financeResult);
  const health = generateHealthPrediction(healthResult);
  const family = generateFamilyPrediction(familyResult);
  const love = generateLovePrediction(loveResult);

  const advice = generateAdvice(profile, year, theme.key);
  const monthlyBreakdowns = buildMonthlyBreakdowns(profile, year, theme.key);

  const overview =
    `${theme.overview} This period aligns with a Personal Year of "${numerology.theme}" energy, ` +
    `reflecting a ${numerology.element} element influence that shapes your experiences throughout ${year}.`;

  return {
    year,
    theme: theme.key,
    overview,
    career,
    finance,
    health,
    family,
    love,
    advice,
    numerology,
    monthlyBreakdowns,
  };
}
