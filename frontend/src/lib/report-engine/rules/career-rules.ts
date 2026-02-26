/**
 * Career Rules Engine
 *
 * Deterministic rule evaluation for career predictions.
 * Includes monthly evaluation for 12-month breakdowns.
 */

import {
  AstrologyProfile,
  RuleEvaluationResult,
  MONTH_PLANETARY_RULERS,
  MONTH_NAMES,
} from "../types";
import {
  CAREER_DASHA_BLOCKS,
  CAREER_HOUSE_BLOCKS,
  CAREER_SIGN_BLOCKS,
  CAREER_PERSONAL_YEAR_BLOCKS,
  CAREER_MONTHLY_BLOCKS,
} from "../blocks/career";

const seededRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};

export function evaluateCareer(
  profile: AstrologyProfile,
  year: number,
  personalYear: number,
): RuleEvaluationResult {
  const allBlocks: string[] = [];
  let strength: RuleEvaluationResult["strength"] = "moderate";

  const personalYearBlock = CAREER_PERSONAL_YEAR_BLOCKS[personalYear];
  if (personalYearBlock) allBlocks.push(personalYearBlock);

  const candidateBlocks: string[] = [];
  const dashaLower = profile.currentDasha.toLowerCase();

  if (dashaLower.includes("saturn") || dashaLower.includes("shani")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.saturn_active);
    strength = "strong";
  } else if (dashaLower.includes("jupiter") || dashaLower.includes("guru")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.jupiter_active);
    strength = "strong";
  } else if (dashaLower.includes("mars") || dashaLower.includes("mangal")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.mars_active);
  } else if (dashaLower.includes("venus") || dashaLower.includes("shukra")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.venus_active);
  } else if (dashaLower.includes("mercury") || dashaLower.includes("budh")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.mercury_active);
  } else if (dashaLower.includes("rahu")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.rahu_active);
  } else if (dashaLower.includes("ketu")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.ketu_active);
  } else if (dashaLower.includes("sun") || dashaLower.includes("surya")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.sun_active);
  } else if (dashaLower.includes("moon") || dashaLower.includes("chandra")) {
    candidateBlocks.push(CAREER_DASHA_BLOCKS.moon_active);
  }

  const { planetaryHouses, planetarySigns } = profile;

  if (planetaryHouses.saturn === 10) {
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.saturn_10th);
    strength = "strong";
  } else if (planetaryHouses.saturn === 1)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.saturn_1st);
  else if (planetaryHouses.saturn === 6)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.saturn_6th);

  if (planetaryHouses.jupiter === 10) {
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.jupiter_10th);
    strength = "strong";
  } else if (planetaryHouses.jupiter === 9)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.jupiter_9th);
  else if (planetaryHouses.jupiter === 2)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.jupiter_2nd);

  if (planetaryHouses.mars === 10)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.mars_10th);
  else if (planetaryHouses.mars === 6)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.mars_6th);

  if (planetaryHouses.venus === 10)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.venus_10th);
  if (planetaryHouses.sun === 10) {
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.sun_10th);
    strength = "strong";
  }
  if (planetaryHouses.mercury === 10)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.mercury_10th);
  if (planetaryHouses.rahu === 10)
    candidateBlocks.push(CAREER_HOUSE_BLOCKS.rahu_10th);

  const saturnSign = String(planetarySigns.saturn || "").toLowerCase();
  if (saturnSign === "capricorn" || saturnSign === "makar")
    candidateBlocks.push(CAREER_SIGN_BLOCKS.saturn_capricorn);
  else if (saturnSign === "aquarius" || saturnSign === "kumbha")
    candidateBlocks.push(CAREER_SIGN_BLOCKS.saturn_aquarius);

  const jupiterSign = String(planetarySigns.jupiter || "").toLowerCase();
  if (jupiterSign === "sagittarius" || jupiterSign === "dhanu")
    candidateBlocks.push(CAREER_SIGN_BLOCKS.jupiter_sagittarius);
  else if (jupiterSign === "pisces" || jupiterSign === "meena")
    candidateBlocks.push(CAREER_SIGN_BLOCKS.jupiter_pisces);

  const marsSign = String(planetarySigns.mars || "").toLowerCase();
  if (marsSign === "aries" || marsSign === "mesha")
    candidateBlocks.push(CAREER_SIGN_BLOCKS.mars_aries);
  else if (marsSign === "scorpio" || marsSign === "vrischika")
    candidateBlocks.push(CAREER_SIGN_BLOCKS.mars_scorpio);

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

export function generateCareerPrediction(result: RuleEvaluationResult): string {
  if (result.blocks.length === 0) {
    return "Career continues on a steady path. Focus on consistent effort and skill development.";
  }
  return result.blocks.join(" ");
}

export function getMonthlyCareerPrediction(
  profile: AstrologyProfile,
  year: number,
  month: number,
): string {
  const base = CAREER_MONTHLY_BLOCKS[month] || "";
  const monthRuler = MONTH_PLANETARY_RULERS[month];
  const dashaLower = profile.currentDasha.toLowerCase();

  // Add dasha-month interaction when the month's ruling planet matches dasha
  if (dashaLower.includes(monthRuler)) {
    return (
      base +
      ` The combined influence of ${MONTH_NAMES[month - 1]}'s planetary ruler and your current dasha period amplifies professional opportunities and brings particularly strong career momentum this month.`
    );
  }
  return base;
}
