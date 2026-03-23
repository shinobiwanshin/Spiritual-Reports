import { db } from "@/db";
import { testimonials } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export const revalidate = 3600; // revalidate every hour

export async function GET() {
  try {
    const rows = await db
      .select()
      .from(testimonials)
      .orderBy(asc(testimonials.sortOrder));

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return NextResponse.json([], { status: 500 });
  }
}
