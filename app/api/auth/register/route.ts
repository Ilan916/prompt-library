import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sessionsTable } from "@/db/schema/sessions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { first_name, last_name, username, email, password } = body;

  if (!first_name || !last_name || !username || !email || !password) {
    return NextResponse.json({ message: "Champs manquants" }, { status: 400 });
  }

  // check exists
  const existing = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (existing.length > 0) {
    return NextResponse.json({ message: "Utilisateur déjà existant" }, { status: 409 });
  }

  const password_hash = await bcrypt.hash(password, 10);

  const [inserted] = await db.insert(usersTable).values({
    first_name,
    last_name,
    username,
    email,
    password_hash,
    auth_provider: "email",
  }).returning();

  // create JWT session
  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) {
    return NextResponse.json({ message: "JWT_SECRET not set" }, { status: 500 });
  }

  const token = jwt.sign({ userId: inserted.id }, jwtSecret, { expiresIn: "7d" });

  // store hash of token rather than raw token
  const crypto = await import("crypto");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  await db.insert(sessionsTable).values({ user_id: inserted.id, token_hash: tokenHash, expires_at: expiresAt }).returning();

  const res = NextResponse.json({ id: inserted.id, email: inserted.email });
  res.cookies.set("session", token, { httpOnly: true, path: "/", maxAge: 7 * 24 * 3600, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return res;
}
