/**
 * Astrology Report Engine - Year Themes
 *
 * Deterministic year theme mapping based on numerology and dasha influence.
 */

import { YearTheme, YearThemeKey } from "./types";

export const YEAR_THEMES: Record<YearThemeKey, YearTheme> = {
  foundation: {
    key: "foundation",
    tone: "slow, patient, stabilizing",
    keywords: ["patience", "discipline", "consistency", "building blocks"],
    overview:
      "This year emphasizes building strong foundations. Progress may feel slow, " +
      "but the work you put in now creates lasting stability. Focus on establishing " +
      "routines, strengthening relationships, and making careful, considered decisions.",
  },
  growth: {
    key: "growth",
    tone: "expansive, opportunity-driven",
    keywords: ["new beginnings", "learning", "expansion", "opportunities"],
    overview:
      "A year of expansion and new possibilities. You may encounter fresh opportunities " +
      "for growth in multiple areas of life. This is an excellent time for learning, " +
      "starting new ventures, and stepping outside your comfort zone.",
  },
  intensity: {
    key: "intensity",
    tone: "demanding, execution-focused",
    keywords: ["responsibility", "hard work", "completion", "achievement"],
    overview:
      "This year demands focused effort and dedication. You will be called upon to " +
      "deliver results and take on significant responsibilities. Hard work will be " +
      "recognized, and major achievements are possible through sustained commitment.",
  },
  transition: {
    key: "transition",
    tone: "transformative, shifting",
    keywords: ["change", "adaptation", "endings", "new directions"],
    overview:
      "A year of meaningful transitions and transformations. Some chapters of your life " +
      "may close while new ones begin. Embrace change as a natural part of growth, and " +
      "remain flexible as circumstances evolve around you.",
  },
  harvest: {
    key: "harvest",
    tone: "rewarding, culminating",
    keywords: ["rewards", "recognition", "success", "fruition"],
    overview:
      "This is a year of reaping what you have sown. Past efforts come to fruition, " +
      "and recognition for your work arrives naturally. Enjoy the rewards of your " +
      "dedication while planning wisely for the cycles ahead.",
  },
};

function calculateNumerologyYear(year: number): number {
  let sum = year;
  while (sum > 9) {
    sum = String(sum)
      .split("")
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }
  return sum;
}

function numerologyToTheme(num: number): YearThemeKey {
  const mapping: Record<number, YearThemeKey> = {
    1: "growth",
    2: "foundation",
    3: "growth",
    4: "foundation",
    5: "transition",
    6: "harvest",
    7: "foundation",
    8: "intensity",
    9: "harvest",
  };
  return mapping[num] || "foundation";
}

function adjustThemeByDasha(
  baseTheme: YearThemeKey,
  currentDasha: string,
): YearThemeKey {
  const dashaLower = currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    if (baseTheme === "growth") return "intensity";
    if (baseTheme === "harvest") return "intensity";
  }
  if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    if (baseTheme === "intensity") return "harvest";
  }
  if (dashaLower.includes("rahu") || dashaLower.includes("ketu")) {
    if (baseTheme === "foundation") return "transition";
  }
  if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    if (baseTheme === "growth") return "intensity";
  }

  return baseTheme;
}

export function getYearTheme(year: number, currentDasha: string): YearTheme {
  const numerologyNum = calculateNumerologyYear(year);
  const baseTheme = numerologyToTheme(numerologyNum);
  const adjustedTheme = adjustThemeByDasha(baseTheme, currentDasha);
  return YEAR_THEMES[adjustedTheme];
}

export function getYearThemes(
  startYear: number,
  duration: number,
  currentDasha: string,
): Map<number, YearTheme> {
  const themes = new Map<number, YearTheme>();
  for (let i = 0; i < duration; i++) {
    const year = startYear + i;
    themes.set(year, getYearTheme(year, currentDasha));
  }
  return themes;
}
