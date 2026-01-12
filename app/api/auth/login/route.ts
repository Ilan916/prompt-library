import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { usersTable } from "@/db/schema/users";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sessionsTable } from "@/db/schema/sessions";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, password } = body;

  if (!email || !password) {
    return NextResponse.json({ message: "Champs manquants" }, { status: 400 });
  }

  const [user] = await db.select().from(usersTable).where(eq(usersTable.email, email));
  if (!user) return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });

  const match = await bcrypt.compare(password, user.password_hash);
  if (!match) {
    return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
  }

  const jwtSecret = process.env.JWT_SECRET;
  if (!jwtSecret) return NextResponse.json({ message: "JWT_SECRET not set" }, { status: 500 });

  const token = jwt.sign({ userId: user.id }, jwtSecret, { expiresIn: "7d" });
  const expiresAt = new Date(Date.now() + 7 * 24 * 3600 * 1000);
  // store hash of token rather than raw token
  const crypto = await import("crypto");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

  await db.insert(sessionsTable).values({ user_id: user.id, token_hash: tokenHash, expires_at: expiresAt }).returning();

  const res = NextResponse.json({ id: user.id, email: user.email });
  res.cookies.set("session", token, { httpOnly: true, path: "/", maxAge: 7 * 24 * 3600, sameSite: "lax", secure: process.env.NODE_ENV === "production" });
  return res;
}
