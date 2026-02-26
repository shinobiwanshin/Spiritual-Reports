const { neon } = require("@neondatabase/serverless");
require("dotenv").config({ path: ".env.local" });

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error("Missing DATABASE_URL");
    process.exit(1);
  }
  const sql = neon(process.env.DATABASE_URL);

  try {
    console.log("Creating report_profiles...");
    await sql`
      CREATE TABLE IF NOT EXISTS report_profiles (
        id serial PRIMARY KEY, 
        email text NOT NULL, 
        name text NOT NULL, 
        dob text NOT NULL, 
        birth_place text, 
        latitude real, 
        longitude real, 
        timezone_offset real, 
        sun_sign text, 
        moon_sign text, 
        ascendant text, 
        current_dasha text, 
        planetary_houses json, 
        planetary_signs json, 
        generated_at timestamp NOT NULL DEFAULT NOW(), 
        created_at timestamp DEFAULT NOW()
      );
    `;

    console.log("Creating index report_profiles_email_dob_idx...");
    await sql`
      CREATE UNIQUE INDEX IF NOT EXISTS report_profiles_email_dob_idx ON report_profiles (email, dob);
    `;

    console.log("Creating report_history...");
    await sql`
      CREATE TABLE IF NOT EXISTS report_history (
        id serial PRIMARY KEY, 
        profile_id integer NOT NULL REFERENCES report_profiles (id), 
        duration integer NOT NULL, 
        blob_url text, 
        report_data json, 
        email_sent_at timestamp, 
        created_at timestamp DEFAULT NOW()
      );
    `;

    console.log("Done!");
    process.exit(0);
  } catch (err) {
    console.error("Error running migrations:", err);
    process.exit(1);
  }
}

run();
