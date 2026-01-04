import { NextResponse } from "next/server";
import { getDb } from "@/app/lib/db";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const db = getDb();

  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q");

  const users = q
    ? await db`
        SELECT id, email, name, created_at
        FROM users
        WHERE name ILIKE ${"%" + q + "%"}
        ORDER BY id DESC
        LIMIT ${50}
      `
    : await db`
        SELECT id, email, name, created_at
        FROM users
        ORDER BY id DESC
        LIMIT ${50}
      `;

  return NextResponse.json({ users });
}