import { pgTable, uuid, timestamp, varchar } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

// Store a hash of the session token instead of the raw token for better security.
export const sessionsTable = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),

  user_id: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),

  token_hash: varchar("token_hash", { length: 128 }).notNull(),

  expires_at: timestamp("expires_at").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
