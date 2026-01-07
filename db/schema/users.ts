import { pgEnum, pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const authProviderEnum = pgEnum("auth_provider", ["email", "google"]);

export const usersTable = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),

  first_name: varchar("first_name", { length: 128 }).notNull(),
  last_name: varchar("last_name", { length: 128 }).notNull(),

  username: varchar("username", { length: 64 }).notNull().unique(),
  email: varchar("email", { length: 256 }).notNull().unique(),

  password_hash: varchar("password_hash", { length: 512 }),

  auth_provider: authProviderEnum("auth_provider").notNull(),

  avatar_url: varchar("avatar_url", { length: 512 }),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
