/**
 * Family Rules Engine
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  FAMILY_DASHA_BLOCKS,
  FAMILY_HOUSE_BLOCKS,
  FAMILY_PERSONAL_YEAR_BLOCKS,
  FAMILY_MONTHLY_BLOCKS,
} from "../blocks/family";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluateFamily(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = FAMILY_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.saturn_active);
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.jupiter_active);
    strength = "strong";
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.venus_active);
    strength = "strong";
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.ketu_active);
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(FAMILY_DASHA_BLOCKS.moon_active);
    strength = "strong";
  }

  const { planetaryHouses } = profile;

  if (planetaryHouses.jupiter === 4) {
    candidateBlocks.push(FAMILY_HOUSE_BLOCKS.jupiter_4th);
    strength = "strong";
  }
  if (planetaryHouses.saturn === 4)
    candidateBlocks.push(FAMILY_HOUSE_BLOCKS.saturn_4th);
  if (planetaryHouses.mars === 4)
    candidateBlocks.push(FAMILY_HOUSE_BLOCKS.mars_4th);
  if (planetaryHouses.venus === 4)
    candidateBlocks.push(FAMILY_HOUSE_BLOCKS.venus_4th);
  if (planetaryHouses.moon === 4) {
    candidateBlocks.push(FAMILY_HOUSE_BLOCKS.moon_4th);
    strength = "strong";
  }

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

export function generateFamilyPrediction(result: RuleEvaluationResult): string {
  if (result.blocks.length === 0) {
    return "Family life remains harmonious and steady. Focus on quality time, open communication, and shared experiences with loved ones.";
  }
  return result.blocks.join(" ");
}

export function getMonthlyFamilyPrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = FAMILY_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` Your dasha period's alignment with ${MONTH_NAMES[month - 1]}'s planetary energy creates an especially significant month for family dynamics — both opportunities for deeper connection and important family developments are heightened.`
    );
  }
  return base;
}
