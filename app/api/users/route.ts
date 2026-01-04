import { NextResponse } from "next/server";
import { db } from "../../lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q"); // optional filter

  // Tagged template => safe parameterization (no SQL injection)
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