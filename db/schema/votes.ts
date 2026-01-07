import { pgTable, uuid, integer, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { promptsTable } from "./prompt";

export const votesTable = pgTable(
  "votes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    user_id: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),

    prompt_id: uuid("prompt_id").notNull().references(() => promptsTable.id, { onDelete: "cascade" }),

    value: integer("value").notNull(), // 1 = upvote, -1 = downvote

    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    unique_vote: uniqueIndex("unique_vote").on(table.user_id, table.prompt_id),
  })
);
