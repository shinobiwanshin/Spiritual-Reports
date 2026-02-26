CREATE TABLE "blog_posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"date" text NOT NULL,
	"category" text NOT NULL,
	"read_time" text NOT NULL,
	"icon_name" text NOT NULL,
	"content" text,
	"image" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" serial PRIMARY KEY NOT NULL,
	"order_id" text NOT NULL,
	"cf_order_id" text,
	"payment_session_id" text,
	"customer_name" text NOT NULL,
	"customer_email" text NOT NULL,
	"customer_phone" text NOT NULL,
	"report_slug" text NOT NULL,
	"amount" integer NOT NULL,
	"currency" text DEFAULT 'INR' NOT NULL,
	"status" text DEFAULT 'CREATED' NOT NULL,
	"form_data" json,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "orders_order_id_unique" UNIQUE("order_id")
);
--> statement-breakpoint
CREATE TABLE "report_history" (
	"id" serial PRIMARY KEY NOT NULL,
	"profile_id" integer NOT NULL,
	"duration" integer NOT NULL,
	"blob_url" text,
	"report_data" json,
	"email_sent_at" timestamp,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "report_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"dob" text NOT NULL,
	"birth_place" text,
	"latitude" real,
	"longitude" real,
	"timezone_offset" real,
	"sun_sign" text,
	"moon_sign" text,
	"ascendant" text,
	"current_dasha" text,
	"planetary_houses" json,
	"planetary_signs" json,
	"generated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "services" (
	"id" serial PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"subtitle" text NOT NULL,
	"duration" text NOT NULL,
	"description" text NOT NULL,
	"highlights" json NOT NULL,
	"icon_name" text NOT NULL,
	"accent" text NOT NULL,
	"featured" boolean DEFAULT false,
	"price" integer DEFAULT 249 NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "services_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "report_history" ADD CONSTRAINT "report_history_profile_id_report_profiles_id_fk" FOREIGN KEY ("profile_id") REFERENCES "public"."report_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "report_profiles_email_dob_idx" ON "report_profiles" USING btree ("email","dob");