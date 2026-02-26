import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  json,
  integer,
  uniqueIndex,
  real,
} from "drizzle-orm/pg-core";

export const blogPosts = pgTable("blog_posts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  date: text("date").notNull(),
  category: text("category").notNull(),
  readTime: text("read_time").notNull(),
  iconName: text("icon_name").notNull(),
  content: text("content"),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  duration: text("duration").notNull(),
  description: text("description").notNull(),
  highlights: json("highlights").$type<string[]>().notNull(),
  iconName: text("icon_name").notNull(),
  accent: text("accent").notNull(),
  featured: boolean("featured").default(false),
  price: integer("price").notNull().default(249),
  createdAt: timestamp("created_at").defaultNow(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  orderId: text("order_id").notNull().unique(),
  cfOrderId: text("cf_order_id"),
  paymentSessionId: text("payment_session_id"),
  customerName: text("customer_name").notNull(),
  customerEmail: text("customer_email").notNull(),
  customerPhone: text("customer_phone").notNull(),
  reportSlug: text("report_slug").notNull(),
  amount: integer("amount").notNull(),
  currency: text("currency").default("INR").notNull(),
  status: text("status").default("CREATED").notNull(),
  formData: json("form_data"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

/**
 * Stores the astrological profile + rule-base per client (email + DOB).
 * Reused for consistency across multiple report orders.
 * Expires after 7 years to ensure freshness.
 */
export const reportProfiles = pgTable(
  "report_profiles",
  {
    id: serial("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name").notNull(),
    dob: text("dob").notNull(),
    birthPlace: text("birth_place"),
    latitude: real("latitude"),
    longitude: real("longitude"),
    timezoneOffset: real("timezone_offset"),
    // Astrological data from API
    sunSign: text("sun_sign"),
    moonSign: text("moon_sign"),
    ascendant: text("ascendant"),
    currentDasha: text("current_dasha"),
    planetaryHouses: json("planetary_houses").$type<Record<string, number>>(),
    planetarySigns: json("planetary_signs").$type<Record<string, string>>(),
    // Timestamps
    generatedAt: timestamp("generated_at").defaultNow().notNull(),
    createdAt: timestamp("created_at").defaultNow(),
  },
  (table) => [
    uniqueIndex("report_profiles_email_dob_idx").on(table.email, table.dob),
  ],
);

/**
 * Stores each generated report with its full JSON data and blob URL.
 */
export const reportHistory = pgTable("report_history", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id")
    .references(() => reportProfiles.id)
    .notNull(),
  duration: integer("duration").notNull(),
  blobUrl: text("blob_url"),
  reportData: json("report_data"),
  emailSentAt: timestamp("email_sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});
