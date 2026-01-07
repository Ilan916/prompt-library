import { pgTable, uuid, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { usersTable } from "./users";
import { promptsTable } from "./prompt";

export const favoritesTable = pgTable(
  "favorites",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    user_id: uuid("user_id").notNull().references(() => usersTable.id, { onDelete: "cascade" }),

    prompt_id: uuid("prompt_id").notNull().references(() => promptsTable.id, { onDelete: "cascade" }),

    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    unique_favorite: uniqueIndex("unique_favorite").on(table.user_id, table.prompt_id),
  })
);
