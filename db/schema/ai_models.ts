import {
  pgTable,
  uuid,
  varchar,
  timestamp,
} from "drizzle-orm/pg-core";

export const aiModelsTable = pgTable("ai_models", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 64 }).notNull().unique(), // ChatGPT, Claude…
  slug: varchar("slug", { length: 64 }).notNull().unique(), // chatgpt, claude…

  created_at: timestamp("created_at").defaultNow().notNull(),
});
