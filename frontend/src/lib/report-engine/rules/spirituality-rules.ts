/**
 * Spirituality Rules Engine
 *
 * Deterministic rule evaluation for spirituality predictions.
 * Includes monthly evaluation for 12-month breakdowns.
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  SPIRITUALITY_DASHA_BLOCKS,
  SPIRITUALITY_HOUSE_BLOCKS,
  SPIRITUALITY_SIGN_BLOCKS,
  SPIRITUALITY_PERSONAL_YEAR_BLOCKS,
  SPIRITUALITY_MONTHLY_BLOCKS,
} from "../blocks/spirituality";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluateSpirituality(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = SPIRITUALITY_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.saturn_active);
    strength = "strong";
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.jupiter_active);
    strength = "strong";
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.venus_active);
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.ketu_active);
    strength = "strong";
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(SPIRITUALITY_DASHA_BLOCKS.moon_active);
  }

  const { planetaryHouses, planetarySigns } = profile;

  if (planetaryHouses.saturn === 1)
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.saturn_1st);
  else if (planetaryHouses.saturn === 12) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.saturn_12th);
    strength = "strong";
  }

  if (planetaryHouses.jupiter === 9) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.jupiter_9th);
    strength = "strong";
  } else if (planetaryHouses.jupiter === 12) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.jupiter_12th);
  }

  if (planetaryHouses.mars === 8) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.mars_8th);
  }

  if (planetaryHouses.venus === 6) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.venus_6th);
  }

  if (planetaryHouses.sun === 9) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.sun_9th);
    strength = "strong";
  }

  if (planetaryHouses.moon === 4) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.moon_4th);
  }

  if (planetaryHouses.mercury === 8) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.mercury_8th);
  }

  if (planetaryHouses.rahu === 12) {
    candidateBlocks.push(SPIRITUALITY_HOUSE_BLOCKS.rahu_12th);
  }

  const jupiterSign = String(planetarySigns.jupiter || "").toLowerCase();
  if (jupiterSign === "sagittarius" || jupiterSign === "dhanu")
    candidateBlocks.push(SPIRITUALITY_SIGN_BLOCKS.jupiter_sagittarius);
  else if (jupiterSign === "pisces" || jupiterSign === "meena")
    candidateBlocks.push(SPIRITUALITY_SIGN_BLOCKS.jupiter_pisces);

  const saturnSign = String(planetarySigns.saturn || "").toLowerCase();
  if (saturnSign === "aquarius" || saturnSign === "kumbha")
    candidateBlocks.push(SPIRITUALITY_SIGN_BLOCKS.saturn_aquarius);

  const ketuSign = String(planetarySigns.ketu || "").toLowerCase();
  if (ketuSign === "scorpio" || ketuSign === "vrischika")
    candidateBlocks.push(SPIRITUALITY_SIGN_BLOCKS.ketu_scorpio);

  const moonSign = String(planetarySigns.moon || "").toLowerCase();
  if (moonSign === "cancer" || moonSign === "karka")
    candidateBlocks.push(SPIRITUALITY_SIGN_BLOCKS.moon_cancer);

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

export function generateSpiritualityPrediction(
  result: RuleEvaluationResult,
): string {
  if (result.blocks.length === 0) {
    return "Your spiritual path remains steady. Continue with your foundational practices and seek light in the everyday moments.";
  }
  return result.blocks.join(" ");
}

export function getMonthlySpiritualityPrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = SPIRITUALITY_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` The combined resonance of ${MONTH_NAMES[month - 1]}'s planetary ruler and your dasha creates a powerful portal for spiritual insight and intensified inner experiences this month.`
    );
  }
  return base;
}
