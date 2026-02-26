import nodemailer from "nodemailer";
import path from "path";

const SMTP_HOST = process.env.SMTP_HOST || "smtp.gmail.com";
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587");
const SMTP_USER = process.env.SMTP_USER || "";
const SMTP_PASS = process.env.SMTP_PASS || "";
const SMTP_FROM = process.env.SMTP_FROM || `ShivaBakthi <${SMTP_USER}>`;

let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_PORT === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });
  }
  return transporter;
}

export interface ReportEmailData {
  to: string;
  name: string;
  blobUrl: string;
  duration: string;
  years: number[];
  generatedAt: string;
}

export async function sendReportEmail(data: ReportEmailData): Promise<boolean> {
  if (!SMTP_USER || !SMTP_PASS) {
    console.warn("SMTP not configured — skipping email");
    return false;
  }

  const yearsList = data.years.join(", ");
  const dateStr = new Date(data.generatedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"></head>
<body style="margin:0;padding:0;background:#f6f7f9;font-family:Georgia,serif;">
  <div style="max-width:600px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;margin-top:20px;margin-bottom:20px;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#16213e,#1a1a4e);padding:30px;text-align:center;">
      <img src="cid:logo" alt="ShivaBakthi" style="width:90px;height:90px;border-radius:50%;margin-bottom:12px;display:inline-block;border:2px solid #cfa375;" />
      <h1 style="color:white;font-size:22px;margin:0 0 6px;">Your Astrology Report is Ready</h1>
      <p style="color:#cfa375;font-size:14px;margin:0;font-weight:bold;">${data.duration} Prediction</p>
    </div>

    <!-- Body -->
    <div style="padding:30px;">
      <p style="font-size:16px;color:#1a1a2e;margin-bottom:20px;">Namaste <strong>${data.name}</strong>,</p>

      <p style="color:#444;line-height:1.7;margin-bottom:20px;">
        Your personalized astrology report has been generated with detailed month-by-month
        breakdowns covering career, finance, health, family, and love for the year(s)
        <strong>${yearsList}</strong>.
      </p>

      <!-- CTA Button -->
      <div style="text-align:center;margin:30px 0;">
        <a href="${data.blobUrl}" target="_blank" style="display:inline-block;background:#f97316;color:white;text-decoration:none;padding:14px 40px;border-radius:50px;font-size:16px;font-weight:bold;box-shadow:0 4px 15px rgba(249,115,22,0.3);">
          📄 View Your Report
        </a>
      </div>

      <p style="color:#888;font-size:13px;line-height:1.6;">
        You can also save it as a PDF by clicking the "Save as PDF" button inside the report.
        This link will remain accessible.
      </p>

      <!-- Details Box -->
      <div style="background:#f6f7f9;border-radius:8px;padding:16px;margin-top:20px;">
        <div style="font-size:12px;color:#888;margin-bottom:4px;">Report Details</div>
        <div style="font-size:14px;color:#1a1a2e;">
          <strong>Duration:</strong> ${data.duration}<br>
          <strong>Years:</strong> ${yearsList}<br>
          <strong>Generated:</strong> ${dateStr}
        </div>
      </div>
    </div>

    <!-- Footer -->
    <div style="background:#f6f7f9;padding:20px;text-align:center;border-top:1px solid #eee;">
      <p style="color:#f97316;font-weight:bold;font-size:14px;margin:0 0 4px;">ShivaBakthi</p>
      <p style="color:#aaa;font-size:11px;margin:0;">Guided by Ancient Wisdom • Vedic Astrology Reports</p>
      <p style="color:#ccc;font-size:10px;margin-top:10px;">
        This is an automated email. Please do not reply.
      </p>
    </div>
  </div>
</body>
</html>`;

  try {
    const transport = getTransporter();

    // Absolute path to the local image
    const imagePath = path.join(
      process.cwd(),
      "public",
      "images",
      "Circle Crop Image.png",
    );

    await transport.sendMail({
      from: SMTP_FROM,
      to: data.to,
      subject: `Your ${data.duration} Astrology Report is Ready — ShivaBakthi`,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: imagePath,
          cid: "logo", // references cid:logo in the HTML
        },
      ],
    });
    return true;
  } catch (error) {
    console.error("Failed to send report email:", error);
    return false;
  }
}
