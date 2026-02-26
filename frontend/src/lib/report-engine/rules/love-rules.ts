/**
 * Love / Relationship Rules Engine
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  LOVE_DASHA_BLOCKS,
  LOVE_HOUSE_BLOCKS,
  LOVE_PERSONAL_YEAR_BLOCKS,
  LOVE_MONTHLY_BLOCKS,
} from "../blocks/love";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluateLove(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = LOVE_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.venus_active);
    strength = "strong";
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.jupiter_active);
    strength = "strong";
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.saturn_active);
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.ketu_active);
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(LOVE_DASHA_BLOCKS.moon_active);
    strength = "strong";
  }

  const { planetaryHouses } = profile;

  if (planetaryHouses.venus === 7) {
    candidateBlocks.push(LOVE_HOUSE_BLOCKS.venus_7th);
    strength = "strong";
  }
  if (planetaryHouses.mars === 7)
    candidateBlocks.push(LOVE_HOUSE_BLOCKS.mars_7th);
  if (planetaryHouses.jupiter === 7) {
    candidateBlocks.push(LOVE_HOUSE_BLOCKS.jupiter_7th);
    strength = "strong";
  }
  if (planetaryHouses.saturn === 7)
    candidateBlocks.push(LOVE_HOUSE_BLOCKS.saturn_7th);
  if (planetaryHouses.rahu === 7)
    candidateBlocks.push(LOVE_HOUSE_BLOCKS.rahu_7th);
  if (planetaryHouses.venus === 5)
    candidateBlocks.push(LOVE_HOUSE_BLOCKS.venus_5th);

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

export function generateLovePrediction(result: RuleEvaluationResult): string {
  if (result.blocks.length === 0) {
    return "Love life remains gentle and steady. Focus on emotional growth, authentic self-expression, and nurturing existing connections.";
  }
  return result.blocks.join(" ");
}

export function getMonthlyLovePrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = LOVE_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` The resonance between your dasha and ${MONTH_NAMES[month - 1]}'s planetary influence creates an intensely romantic month with heightened emotional sensitivity and deeper opportunities for meaningful connection.`
    );
  }
  return base;
}
