import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const categoriesTable = pgTable("categories", {
  id: uuid("id").defaultRandom().primaryKey(),

  name: varchar("name", { length: 64 }).notNull().unique(),

  slug: varchar("slug", { length: 64 }).notNull().unique(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
