/**
 * PDF Generator for Astrology Reports
 *
 * Print-safe, A4-optimized HTML for PDF generation.
 * Enhanced with birth charts, numerology, zodiac, and monthly breakdown tables.
 */

import {
  AstrologyReport,
  YearlyReport,
  AstrologyProfile,
  MonthlyPrediction,
} from "./types";

export type ExtendedAstrologyReport = AstrologyReport & {
  profile?: AstrologyProfile;
  name?: string;
  birthDetails?: { date: string; time: string; location: string };
  charts?: { rasi?: string | null; navamsa?: string | null };
  zodiacRelations?: {
    friendSigns?: { sign: string; description: string }[];
    enemySigns?: { sign: string; description: string }[];
  };
};

function capitalizeFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const ZODIAC_SYMBOLS: Record<string, string> = {
  aries: "♈",
  taurus: "♉",
  gemini: "♊",
  cancer: "♋",
  leo: "♌",
  virgo: "♍",
  libra: "♎",
  scorpio: "♏",
  sagittarius: "♐",
  capricorn: "♑",
  aquarius: "♒",
  pisces: "♓",
};

function generateIntroSection(report: ExtendedAstrologyReport): string {
  const name = report.name || "Valued Seeker";
  return `
    <div class="intro-section">
      <p class="greeting">Namaste ${name},</p>
      <p>Your <strong>"${report.duration} Prediction"</strong> report is now ready. This comprehensive report contains detailed insights covering every key aspect of your life — career, finances, health, family, and love — with <strong>month-by-month breakdowns</strong> for each year.</p>
      <p>Based on the sacred principles of Vedic Astrology, combined with Numerology and Zodiac analysis, this report offers personalized guidance to help you navigate life's journey with clarity, confidence, and purpose.</p>
      <p>Each prediction is generated using your unique birth chart, planetary positions, current Mahadasha period, and Personal Year numerology cycle — ensuring the insights are deeply personal and meaningful to your individual path.</p>
    </div>
  `;
}

function generateBirthSection(report: ExtendedAstrologyReport): string {
  if (!report.birthDetails) return "";
  return `
    <div class="section">
      <h2 class="section-title">📅 Birth Details</h2>
      <div class="info-grid">
        <div class="info-item"><label>Date of Birth</label><value>${report.birthDetails.date}</value></div>
        <div class="info-item"><label>Time of Birth</label><value>${report.birthDetails.time}</value></div>
        <div class="info-item"><label>Place of Birth</label><value>${report.birthDetails.location}</value></div>
      </div>
    </div>
  `;
}

function generateNumerologySection(report: ExtendedAstrologyReport): string {
  if (!report.numerology) return "";
  const { lifePath, destiny, soulUrge, personality, birthDate } =
    report.numerology;
  const renderCard = (
    label: string,
    num: { number: number; meaning: string } | undefined,
  ) => {
    if (!num) return "";
    return `
      <div class="number-card">
        <div class="number-label">${label}</div>
        <div class="number-value">${num.number}</div>
        <div class="number-meaning">${num.meaning}</div>
      </div>`;
  };
  return `
    <div class="section page-break">
      <h2 class="section-title">🔢 Core Numerology Profile</h2>
      <div class="numerology-grid">
        ${renderCard("Life Path Number", lifePath)}
        ${renderCard("Destiny (Name) Number", destiny)}
        ${renderCard("Soul Urge Number", soulUrge)}
        ${renderCard("Personality Number", personality)}
        ${renderCard("Birth Date Number", birthDate)}
      </div>
    </div>
  `;
}

function generateZodiacRelationsSection(
  report: ExtendedAstrologyReport,
): string {
  if (!report.zodiacRelations) return "";
  const { friendSigns, enemySigns } = report.zodiacRelations;
  const renderSign = (
    sign: { sign: string; description: string },
    color: string,
  ) => {
    const symbol = ZODIAC_SYMBOLS[sign.sign.toLowerCase()] || "✦";
    return `
      <div class="zodiac-card" style="border-color: ${color}">
        <div class="zodiac-symbol">${symbol}</div>
        <div class="zodiac-name" style="color: ${color}">${capitalizeFirst(sign.sign)}</div>
        <div class="zodiac-desc">${sign.description}</div>
      </div>`;
  };
  return `
    <div class="section">
      <h2 class="section-title">Core Zodiac Compatibility (Lifetime)</h2>
      <div class="zodiac-relations">
        ${
          friendSigns && friendSigns.length > 0
            ? `
        <div class="zodiac-group">
          <h3 class="zodiac-group-title" style="color: #10b981">FRIEND Zodiac</h3>
          <div class="zodiac-row">${friendSigns.map((s) => renderSign(s, "#10b981")).join("")}</div>
        </div>`
            : ""
        }
        ${
          enemySigns && enemySigns.length > 0
            ? `
        <div class="zodiac-group">
          <h3 class="zodiac-group-title" style="color: #ef4444">ENEMY Zodiac</h3>
          <div class="zodiac-row">${enemySigns.map((s) => renderSign(s, "#ef4444")).join("")}</div>
        </div>`
            : ""
        }
      </div>
    </div>
  `;
}

function generateMonthlyTable(monthlyBreakdowns: MonthlyPrediction[]): string {
  if (!monthlyBreakdowns || monthlyBreakdowns.length === 0) return "";

  const monthSections = monthlyBreakdowns
    .map(
      (m) => `
    <div class="monthly-card">
      <div class="monthly-header">
        <h4 class="monthly-name">${m.monthName}</h4>
        <span class="monthly-tone">${m.overallTone}</span>
      </div>
      <div class="monthly-predictions">
        <div class="monthly-area">
          <span class="area-icon">💼</span>
          <div class="area-content">
            <strong>Career</strong>
            <p>${m.career}</p>
          </div>
        </div>
        <div class="monthly-area">
          <span class="area-icon">💰</span>
          <div class="area-content">
            <strong>Finance</strong>
            <p>${m.finance}</p>
          </div>
        </div>
        <div class="monthly-area">
          <span class="area-icon">🏥</span>
          <div class="area-content">
            <strong>Health</strong>
            <p>${m.health}</p>
          </div>
        </div>
        <div class="monthly-area">
          <span class="area-icon">👨‍👩‍👧‍👦</span>
          <div class="area-content">
            <strong>Family</strong>
            <p>${m.family}</p>
          </div>
        </div>
        <div class="monthly-area">
          <span class="area-icon">❤️</span>
          <div class="area-content">
            <strong>Love</strong>
            <p>${m.love}</p>
          </div>
        </div>
      </div>
    </div>
  `,
    )
    .join("");

  return `
    <div class="monthly-section">
      <h3 class="monthly-section-title">📅 Month-by-Month Breakdown</h3>
      ${monthSections}
    </div>
  `;
}

function generateYearSection(yearReport: YearlyReport): string {
  const numerologyBlock = yearReport.numerology
    ? `
    <div class="year-numerology-box" style="border-left-color: ${
      yearReport.numerology.element === "Fire"
        ? "#ef4444"
        : yearReport.numerology.element === "Water"
          ? "#3b82f6"
          : yearReport.numerology.element === "Air"
            ? "#eab308"
            : "#22c55e"
    }">
      <div class="yn-header">
        <span class="yn-title">Personal Year ${yearReport.numerology.personalYear}</span>
        <span class="yn-theme">(${yearReport.numerology.theme})</span>
      </div>
      <p class="yn-pred">${yearReport.numerology.prediction}</p>
      <div class="yn-element-tag" style="background: ${
        yearReport.numerology.element === "Fire"
          ? "#fef2f2; color: #991b1b"
          : yearReport.numerology.element === "Water"
            ? "#eff6ff; color: #1e40af"
            : yearReport.numerology.element === "Air"
              ? "#fefce8; color: #854d0e"
              : "#f0fdf4; color: #166534"
      }">Element: ${yearReport.numerology.element} Emphasis</div>
    </div>`
    : "";

  return `
    <div class="year-section page-break">
      <div class="year-header">
        <h2>YOUR YEAR ${yearReport.year} PREDICTION</h2>
      </div>
      ${numerologyBlock}
      <div class="year-overview"><p>${yearReport.overview}</p></div>
      <div class="predictions-list">
        <div class="prediction-item">
          <h3 class="prediction-title">💼 Career</h3>
          <p>${yearReport.career}</p>
        </div>
        <div class="prediction-item">
          <h3 class="prediction-title">💰 Finance</h3>
          <p>${yearReport.finance}</p>
        </div>
        <div class="prediction-item">
          <h3 class="prediction-title">🏥 Health</h3>
          <p>${yearReport.health}</p>
        </div>
        <div class="prediction-item">
          <h3 class="prediction-title">👨‍👩‍👧‍👦 Family</h3>
          <p>${yearReport.family}</p>
        </div>
        <div class="prediction-item">
          <h3 class="prediction-title">❤️ Love</h3>
          <p>${yearReport.love}</p>
        </div>
        <div class="prediction-item advice-main">
          <h3 class="prediction-title">🙏 Advice for ${yearReport.year}</h3>
          <p>${yearReport.advice}</p>
        </div>
      </div>
      ${generateMonthlyTable(yearReport.monthlyBreakdowns)}
    </div>
  `;
}

export function generatePrintHTML(report: ExtendedAstrologyReport): string {
  const yearlySections = report.reports
    .map((r) => generateYearSection(r))
    .join("");

  const phasesSection = report.phases?.length
    ? `
    <div class="phases-section">
      <h2 class="section-title">📊 Life Phases</h2>
      ${report.phases
        .map(
          (phase) => `
        <div class="phase-card">
          <h3>${phase.name} (${phase.years.join("-")})</h3>
          <p>${phase.summary}</p>
        </div>
      `,
        )
        .join("")}
    </div>`
    : "";

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Astrology Report - ${report.duration}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    @media print {
      body { background: white !important; }
      .no-print { display: none !important; }
      .page-break { page-break-before: always; }
    }
    * { box-sizing: border-box; }
    body { font-family: "Georgia", serif; color: #1a1a2e; margin: 0; padding: 0; background: white; line-height: 1.7; }
    .container { max-width: 720px; margin: 0 auto; padding: 20px; }

    .header { text-align: center; padding-bottom: 20px; border-bottom: 3px solid #f97316; margin-bottom: 30px; }
    .om-symbol { font-size: 36px; color: #f97316; }
    .header h1 { font-size: 26px; margin: 10px 0 5px; color: #16213e; }
    .header .subtitle { color: #f97316; font-weight: bold; }
    .header .date { font-size: 12px; color: #666; margin-top: 8px; }

    .intro-section { margin-bottom: 30px; line-height: 1.8; }
    .intro-section .greeting { font-size: 18px; font-weight: bold; margin-bottom: 15px; }
    .intro-section p { margin-bottom: 12px; }

    .section { margin-bottom: 30px; page-break-inside: avoid; }
    .section-title { font-size: 18px; margin-bottom: 15px; border-bottom: 2px solid #f97316; padding-bottom: 8px; color: #16213e; }

    .info-grid { display: flex; gap: 15px; }
    .info-item { flex: 1; background: #f6f7f9; padding: 12px; border-radius: 8px; }
    .info-item label { font-size: 11px; color: #666; display: block; }
    .info-item value { display: block; font-weight: bold; margin-top: 4px; font-size: 13px; }

    .numerology-grid { display: flex; gap: 15px; flex-wrap: wrap; }
    .number-card { flex: 1; min-width: 120px; border: 2px solid #f97316; border-radius: 10px; padding: 15px; text-align: center; background: #fff7ed; }
    .number-label { font-size: 10px; color: #f97316; font-weight: bold; text-transform: uppercase; }
    .number-value { font-size: 32px; font-weight: bold; color: #16213e; margin: 6px 0; }
    .number-meaning { font-size: 11px; color: #666; }

    .year-numerology-box { margin-bottom: 25px; padding: 15px; background: #fafaf9; border-left: 4px solid #f97316; border-radius: 0 8px 8px 0; }
    .yn-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 8px; }
    .yn-title { font-weight: bold; color: #16213e; font-size: 14px; }
    .yn-theme { color: #666; font-size: 12px; font-style: italic; }
    .yn-pred { margin: 0; font-size: 13px; line-height: 1.6; text-align: justify; }
    .yn-element-tag { display: inline-block; margin-top: 8px; padding: 3px 8px; border-radius: 4px; font-size: 10px; font-weight: bold; text-transform: uppercase; }

    .zodiac-relations { display: flex; gap: 30px; }
    .zodiac-group { flex: 1; }
    .zodiac-group-title { font-size: 16px; font-weight: bold; margin-bottom: 15px; }
    .zodiac-row { display: flex; gap: 15px; }
    .zodiac-card { flex: 1; border: 2px solid; border-radius: 10px; padding: 15px; text-align: center; }
    .zodiac-symbol { font-size: 36px; margin-bottom: 8px; }
    .zodiac-name { font-size: 14px; font-weight: bold; margin-bottom: 5px; }
    .zodiac-desc { font-size: 10px; color: #666; }

    .year-section { margin-bottom: 40px; }
    .year-header { background: #f97316; color: white; padding: 12px 20px; border-radius: 5px; margin-bottom: 20px; }
    .year-header h2 { margin: 0; font-size: 18px; letter-spacing: 1px; }
    .year-overview { margin-bottom: 25px; line-height: 1.8; text-align: justify; }

    .predictions-list { display: flex; flex-direction: column; gap: 20px; margin-bottom: 30px; }
    .prediction-item { border-left: 3px solid #f97316; padding-left: 15px; }
    .prediction-title { color: #f97316; font-size: 16px; margin-bottom: 8px; }
    .prediction-item p { margin-bottom: 10px; text-align: justify; }
    .advice-main { border-left-color: #10b981; background: #f0fdf4; padding: 15px; border-radius: 0 8px 8px 0; }
    .advice-main .prediction-title { color: #10b981; }

    /* Monthly Breakdown Styles */
    .monthly-section { margin-top: 30px; }
    .monthly-section-title { font-size: 18px; color: #16213e; border-bottom: 2px solid #f97316; padding-bottom: 8px; margin-bottom: 20px; }
    .monthly-card { border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 15px; overflow: hidden; page-break-inside: avoid; }
    .monthly-header { background: linear-gradient(135deg, #16213e, #1a1a4e); color: white; padding: 10px 15px; display: flex; justify-content: space-between; align-items: center; }
    .monthly-name { margin: 0; font-size: 15px; }
    .monthly-tone { font-size: 11px; opacity: 0.8; font-style: italic; }
    .monthly-predictions { padding: 12px 15px; }
    .monthly-area { display: flex; gap: 10px; padding: 8px 0; border-bottom: 1px solid #f3f4f6; }
    .monthly-area:last-child { border-bottom: none; }
    .area-icon { font-size: 16px; min-width: 24px; padding-top: 2px; }
    .area-content { flex: 1; }
    .area-content strong { font-size: 12px; color: #f97316; text-transform: uppercase; display: block; margin-bottom: 3px; }
    .area-content p { margin: 0; font-size: 12px; line-height: 1.5; text-align: justify; }

    .phases-section { margin: 30px 0; }
    .phase-card { background: #f6f7f9; padding: 15px; border-radius: 8px; margin-bottom: 15px; }
    .phase-card h3 { color: #f97316; margin-bottom: 8px; }

    .disclaimer { margin-top: 40px; padding: 15px; background: #fff7ed; border-radius: 8px; font-size: 11px; color: #92400e; border: 1px solid #f97316; }
    .disclaimer strong { display: block; margin-bottom: 8px; }

    .footer { text-align: center; font-size: 11px; color: #777; margin-top: 40px; border-top: 1px solid #ddd; padding-top: 15px; }
    .footer .brand { color: #f97316; font-weight: bold; }

    .print-button { position: fixed; bottom: 20px; right: 20px; background: #f97316; color: white; border: none; padding: 15px 30px; border-radius: 50px; font-size: 16px; cursor: pointer; box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3); }
    .print-button:hover { background: #ea580c; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="om-symbol">ॐ</div>
      <h1>${report.name ? `${report.name}'s` : ""} Astrology Report</h1>
      <div class="subtitle">${report.duration} Prediction</div>
      <div class="date">Years: ${report.years.join(", ")}</div>
    </div>
    ${generateIntroSection(report)}
    ${generateBirthSection(report)}
    ${generateNumerologySection(report)}
    ${generateZodiacRelationsSection(report)}
    ${phasesSection}
    ${yearlySections}
    <div class="disclaimer">
      <strong>⚠️ Disclaimer</strong>
      ${report.disclaimer}
    </div>
    <div class="footer">
      <p>Wishing all the best on your journey,</p>
      <p><span class="brand">ShivaBakthi</span></p>
      <p style="margin-top: 10px;">Generated on ${new Date(report.generatedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}</p>
    </div>
  </div>
  <button class="print-button no-print" onclick="window.print()">📄 Save as PDF</button>
</body>
</html>
  `;
}

export function printReport(report: ExtendedAstrologyReport): void {
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    alert("Please allow popups to download PDF");
    return;
  }
  printWindow.document.write(generatePrintHTML(report));
  printWindow.document.close();
  printWindow.onload = () => {
    printWindow.focus();
    printWindow.print();
  };
}
