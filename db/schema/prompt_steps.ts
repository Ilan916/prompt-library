import { pgEnum, pgTable, uuid, text, integer, timestamp } from "drizzle-orm/pg-core";
import { promptsTable } from "./prompt";

export const stepRoleEnum = pgEnum("step_role", ["user", "assistant"]);

export const promptStepsTable = pgTable("prompt_steps", {
  id: uuid("id").defaultRandom().primaryKey(),

  prompt_id: uuid("prompt_id").notNull().references(() => promptsTable.id, { onDelete: "cascade" }),

  role: stepRoleEnum("role").notNull(),

  content: text("content").notNull(),

  step_order: integer("step_order").notNull(),

  created_at: timestamp("created_at").defaultNow().notNull(),
});
