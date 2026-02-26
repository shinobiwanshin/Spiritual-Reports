/**
 * Astrology Report Engine - Public API
 */

export type {
  AstrologyProfile,
  AstrologyReport,
  YearlyReport,
  MonthlyPrediction,
  ReportDuration,
  ReportPhase,
  YearThemeKey,
  YearTheme,
  RuleEvaluationResult,
} from "./types";

export { DISCLAIMER, PLANETS, ZODIAC_SIGNS, MONTH_NAMES } from "./types";

export {
  generateReport,
  generateCacheKey,
  validateProfile,
} from "./report-generator";

export { normalizeApiResponse, createProfile } from "./normalizer";
export { getYearTheme, getYearThemes, YEAR_THEMES } from "./themes";
export { buildYearlyReport } from "./year-builder";

export { generatePrintHTML, printReport } from "./pdf-generator";
export type { ExtendedAstrologyReport } from "./pdf-generator";
