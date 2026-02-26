/**
 * Astrology Report Engine - Core Type Definitions
 *
 * Normalized schema for astrology data ensuring business logic
 * is independent of external API structure.
 * Enhanced with monthly breakdown types.
 */

// ============================================
// Input Types (Normalized from FreeAstrologyAPI)
// ============================================

export type AstrologyProfile = {
  dob: string;
  name?: string;
  sunSign: string;
  moonSign: string;
  ascendant: string;
  planetaryHouses: Record<string, number>;
  planetarySigns: Record<string, number | string>;
  currentDasha: string;
  upcomingDashas: string[];
  year: number;
};

export type ReportDuration = 1 | 3 | 5;

// ============================================
// Monthly Prediction Types
// ============================================

export type MonthlyPrediction = {
  month: number;
  monthName: string;
  career: string;
  finance: string;
  health: string;
  family: string;
  love: string;
  overallTone: string;
};

// ============================================
// Output Types (Report Structure)
// ============================================

export type YearlyReport = {
  year: number;
  theme: YearThemeKey;
  overview: string;
  career: string;
  finance: string;
  health: string;
  family: string;
  love: string;
  advice: string;
  numerology?: YearlyNumerology;
  monthlyBreakdowns: MonthlyPrediction[];
};

export type ReportPhase = {
  name: string;
  years: number[];
  summary: string;
};

export type AstrologyReport = {
  duration: string;
  years: number[];
  reports: YearlyReport[];
  phases?: ReportPhase[];
  generatedAt: string;
  disclaimer: string;
  numerology?: {
    lifePath: { number: number; meaning: string };
    destiny: { number: number; meaning: string };
    soulUrge: { number: number; meaning: string };
    personality: { number: number; meaning: string };
    birthDate: { number: number; meaning: string };
  };
  zodiacRelations?: {
    friendSigns: { sign: string; description: string }[];
    enemySigns: { sign: string; description: string }[];
  };
};

export type YearlyNumerology = {
  personalYear: number;
  prediction: string;
  theme: string;
  element: "Fire" | "Earth" | "Air" | "Water";
};

export type ExtendedYearlyReport = YearlyReport & {
  numerology?: YearlyNumerology;
};

// ============================================
// Theme Types
// ============================================

export type YearThemeKey =
  | "foundation"
  | "growth"
  | "intensity"
  | "transition"
  | "harvest";

export type YearTheme = {
  key: YearThemeKey;
  tone: string;
  keywords: string[];
  overview: string;
};

// ============================================
// Rule Engine Types
// ============================================

export type RuleEvaluationResult = {
  blocks: string[];
  strength: "strong" | "moderate" | "mild";
};

export type RuleEvaluator = (
  profile: AstrologyProfile,
  year: number,
) => RuleEvaluationResult;

// ============================================
// Constants
// ============================================

export const PLANETS = [
  "sun",
  "moon",
  "mars",
  "mercury",
  "jupiter",
  "venus",
  "saturn",
  "rahu",
  "ketu",
] as const;

export type Planet = (typeof PLANETS)[number];

export const ZODIAC_SIGNS = [
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
] as const;

export type ZodiacSign = (typeof ZODIAC_SIGNS)[number];

export const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;

/**
 * Monthly Planetary Rulers — each month is governed by a planet
 * that modifies the prediction tone for that month.
 */
export const MONTH_PLANETARY_RULERS: Record<number, string> = {
  1: "saturn", // January — discipline, structure
  2: "saturn", // February — persistence
  3: "mars", // March — energy, initiative
  4: "mars", // April — action, drive
  5: "venus", // May — harmony, relationships
  6: "mercury", // June — communication, commerce
  7: "moon", // July — emotions, intuition
  8: "sun", // August — leadership, confidence
  9: "mercury", // September — analysis, learning
  10: "venus", // October — balance, partnerships
  11: "jupiter", // November — expansion, wisdom
  12: "jupiter", // December — reflection, generosity
};

export const DISCLAIMER =
  "Predictions are based on Vedic astrology principles and are advisory in nature. " +
  "They should not be considered as guarantees or substitutes for professional advice. " +
  "Individual results may vary based on personal actions and circumstances.";
