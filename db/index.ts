import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

if (!process.env.DATABASE_URL) {
	throw new Error("No DATABASE_URL found in environment. Set DATABASE_URL or load .env before importing the DB client.");
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql });
