/**
 * Health Rules Engine
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  HEALTH_DASHA_BLOCKS,
  HEALTH_HOUSE_BLOCKS,
  HEALTH_SIGN_BLOCKS,
  HEALTH_PERSONAL_YEAR_BLOCKS,
  HEALTH_MONTHLY_BLOCKS,
} from "../blocks/health";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluateHealth(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = HEALTH_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.saturn_active);
    strength = "strong";
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.jupiter_active);
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.venus_active);
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.ketu_active);
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(HEALTH_DASHA_BLOCKS.moon_active);
  }

  const { planetaryHouses, planetarySigns } = profile;

  if (planetaryHouses.saturn === 6)
    candidateBlocks.push(HEALTH_HOUSE_BLOCKS.saturn_6th);
  if (planetaryHouses.mars === 6)
    candidateBlocks.push(HEALTH_HOUSE_BLOCKS.mars_6th);
  if (planetaryHouses.jupiter === 6)
    candidateBlocks.push(HEALTH_HOUSE_BLOCKS.jupiter_6th);
  if (planetaryHouses.saturn === 1)
    candidateBlocks.push(HEALTH_HOUSE_BLOCKS.saturn_1st);
  if (planetaryHouses.mars === 1)
    candidateBlocks.push(HEALTH_HOUSE_BLOCKS.mars_1st);

  const marsSign = String(planetarySigns.mars || "").toLowerCase();
  if (marsSign === "aries" || marsSign === "mesha")
    candidateBlocks.push(HEALTH_SIGN_BLOCKS.mars_aries);

  const saturnSign = String(planetarySigns.saturn || "").toLowerCase();
  if (saturnSign === "capricorn" || saturnSign === "makar")
    candidateBlocks.push(HEALTH_SIGN_BLOCKS.saturn_capricorn);

  const moonSign = String(planetarySigns.moon || "").toLowerCase();
  if (moonSign === "cancer" || moonSign === "karka")
    candidateBlocks.push(HEALTH_SIGN_BLOCKS.moon_cancer);

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

export function generateHealthPrediction(result: RuleEvaluationResult): string {
  if (result.blocks.length === 0) {
    return "Health remains generally stable. Maintain balanced nutrition, regular exercise, and adequate rest for optimal well-being.";
  }
  return result.blocks.join(" ");
}

export function getMonthlyHealthPrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = HEALTH_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` The alignment between your dasha period and ${MONTH_NAMES[month - 1]}'s ruling planet creates a particularly important month for health awareness — both healing potential and the need for proactive care are amplified.`
    );
  }
  return base;
}
