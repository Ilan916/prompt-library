import {
  pgTable,
  uuid,
  varchar,
  text,
  integer,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const promptTypeEnum = pgEnum("prompt_type", ["text", "image"]);

export const promptsTable = pgTable("prompts", {
  id: uuid("id").defaultRandom().primaryKey(),

  public_id: varchar("public_id", { length: 64 }).notNull().unique(),

  title: varchar("title", { length: 128 }).notNull(),
  objective: text("objective").notNull(),

  author_id: uuid("author_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),

  type: promptTypeEnum("type").notNull(),

  preview_image_url: varchar("preview_image_url", { length: 512 }),

  score: integer("score").notNull().default(0),
  upvotes_count: integer("upvotes_count").notNull().default(0),
  downvotes_count: integer("downvotes_count").notNull().default(0),

  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at").defaultNow().notNull(),
});
