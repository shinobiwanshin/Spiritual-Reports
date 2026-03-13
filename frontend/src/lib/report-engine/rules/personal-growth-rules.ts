/**
 * Personal Growth Rules Engine
 *
 * Deterministic rule evaluation for personal growth predictions.
 * Includes monthly evaluation for 12-month breakdowns.
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  PERSONAL_GROWTH_DASHA_BLOCKS,
  PERSONAL_GROWTH_HOUSE_BLOCKS,
  PERSONAL_GROWTH_SIGN_BLOCKS,
  PERSONAL_GROWTH_PERSONAL_YEAR_BLOCKS,
  PERSONAL_GROWTH_MONTHLY_BLOCKS,
} from "../blocks/personal-growth";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluatePersonalGrowth(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = PERSONAL_GROWTH_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.saturn_active);
    strength = "strong";
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.jupiter_active);
    strength = "strong";
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.venus_active);
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.ketu_active);
    strength = "strong";
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(PERSONAL_GROWTH_DASHA_BLOCKS.moon_active);
  }

  const { planetaryHouses, planetarySigns } = profile;

  if (planetaryHouses.saturn === 2)
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.saturn_2nd);
  if (planetaryHouses.saturn === 8) {
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.saturn_8th);
    strength = "strong";
  }

  if (planetaryHouses.jupiter === 5)
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.jupiter_5th);

  if (planetaryHouses.mars === 3)
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.mars_3rd);

  if (planetaryHouses.venus === 7)
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.venus_7th);

  if (planetaryHouses.mercury === 11)
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.mercury_11th);

  if (planetaryHouses.sun === 1) {
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.sun_1st);
    strength = "strong";
  }

  if (planetaryHouses.moon === 12) {
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.moon_12th);
  }

  if (planetaryHouses.rahu === 9) {
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.rahu_9th);
  }

  if (planetaryHouses.ketu === 3) {
    candidateBlocks.push(PERSONAL_GROWTH_HOUSE_BLOCKS.ketu_3rd);
  }

  const jupiterSign = String(planetarySigns.jupiter || "").toLowerCase();
  if (jupiterSign === "aries" || jupiterSign === "mesha")
    candidateBlocks.push(PERSONAL_GROWTH_SIGN_BLOCKS.jupiter_aries);

  const saturnSign = String(planetarySigns.saturn || "").toLowerCase();
  if (saturnSign === "libra" || saturnSign === "tula")
    candidateBlocks.push(PERSONAL_GROWTH_SIGN_BLOCKS.saturn_libra);

  const marsSign = String(planetarySigns.mars || "").toLowerCase();
  if (marsSign === "capricorn" || marsSign === "makar")
    candidateBlocks.push(PERSONAL_GROWTH_SIGN_BLOCKS.mars_capricorn);

  const venusSign = String(planetarySigns.venus || "").toLowerCase();
  if (venusSign === "taurus" || venusSign === "vrishabha")
    candidateBlocks.push(PERSONAL_GROWTH_SIGN_BLOCKS.venus_taurus);

  const moonSign = String(planetarySigns.moon || "").toLowerCase();
  if (moonSign === "scorpio" || moonSign === "vrischika")
    candidateBlocks.push(PERSONAL_GROWTH_SIGN_BLOCKS.moon_scorpio);

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

export function generatePersonalGrowthPrediction(
  result: RuleEvaluationResult,
): string {
  if (result.blocks.length === 0) {
    return "This is a period of steady integration. There are no sudden shifts; continue to build upon the wisdom you have already gained.";
  }
  return result.blocks.join(" ");
}

export function getMonthlyPersonalGrowthPrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = PERSONAL_GROWTH_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` The planetary energies of ${MONTH_NAMES[month - 1]} strongly support your current dasha, initiating a rapid cycle of accelerated self-discovery.`
    );
  }
  return base;
}
