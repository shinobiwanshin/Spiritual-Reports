import {
  pgTable,
  serial,
  text,
  boolean,
  timestamp,
  json,
  integer,
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
