/**
 * Finance Rules Engine
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  FINANCE_DASHA_BLOCKS,
  FINANCE_HOUSE_BLOCKS,
  FINANCE_SIGN_BLOCKS,
  FINANCE_PERSONAL_YEAR_BLOCKS,
  FINANCE_MONTHLY_BLOCKS,
} from "../blocks/finance";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluateFinance(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = FINANCE_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.saturn_active);
    strength = "strong";
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.jupiter_active);
    strength = "strong";
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.venus_active);
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.ketu_active);
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(FINANCE_DASHA_BLOCKS.moon_active);
  }

  const { planetaryHouses, planetarySigns } = profile;

  if (planetaryHouses.jupiter === 2) {
    candidateBlocks.push(FINANCE_HOUSE_BLOCKS.jupiter_2nd);
    strength = "strong";
  }
  if (planetaryHouses.saturn === 2)
    candidateBlocks.push(FINANCE_HOUSE_BLOCKS.saturn_2nd);
  if (planetaryHouses.venus === 2)
    candidateBlocks.push(FINANCE_HOUSE_BLOCKS.venus_2nd);
  if (planetaryHouses.mars === 2)
    candidateBlocks.push(FINANCE_HOUSE_BLOCKS.mars_2nd);
  if (planetaryHouses.rahu === 11)
    candidateBlocks.push(FINANCE_HOUSE_BLOCKS.rahu_11th);
  if (planetaryHouses.jupiter === 11)
    candidateBlocks.push(FINANCE_HOUSE_BLOCKS.jupiter_11th);

  const jupiterSign = String(planetarySigns.jupiter || "").toLowerCase();
  if (jupiterSign === "sagittarius" || jupiterSign === "dhanu")
    candidateBlocks.push(FINANCE_SIGN_BLOCKS.jupiter_sagittarius);

  const venusSign = String(planetarySigns.venus || "").toLowerCase();
  if (venusSign === "taurus" || venusSign === "vrishabha")
    candidateBlocks.push(FINANCE_SIGN_BLOCKS.venus_taurus);

  const saturnSign = String(planetarySigns.saturn || "").toLowerCase();
  if (saturnSign === "capricorn" || saturnSign === "makar")
    candidateBlocks.push(FINANCE_SIGN_BLOCKS.saturn_capricorn);

  const mercurySign = String(planetarySigns.mercury || "").toLowerCase();
  if (mercurySign === "virgo" || mercurySign === "kanya")
    candidateBlocks.push(FINANCE_SIGN_BLOCKS.mercury_virgo);

  if (candidateBlocks.length > 0) {
    candidateBlocks.sort(
      (a, b) => seededRandom(year + a.length) - seededRandom(year + b.length),
    );
    const count = Math.min(candidateBlocks.length, 2);
    for (let i = 0; i < count; i++) allBlocks.push(candidateBlocks[i]);
  }

  if (allBlocks.length < 2) {
    const used = new Set(allBlocks);
    for (const block of candidateBlocks) {
      if (!used.has(block)) {
        allBlocks.push(block);
        break;
      }
    }
  }

  return { blocks: allBlocks, strength };
}

export function generateFinancePrediction(
  result: RuleEvaluationResult,
): string {
  if (result.blocks.length === 0) {
    return "Finances remain stable with opportunities for moderate growth. Focus on budgeting and smart saving habits.";
  }
  return result.blocks.join(" ");
}

export function getMonthlyFinancePrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = FINANCE_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` Your current dasha period harmonizes with ${MONTH_NAMES[month - 1]}'s financial energy, creating enhanced opportunities for wealth growth and favorable financial outcomes this month.`
    );
  }
  return base;
}
