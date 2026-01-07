import { pgTable, uuid, primaryKey } from "drizzle-orm/pg-core";
import { promptsTable } from "./prompt";
import { categoriesTable } from "./categories";

export const promptCategoriesTable = pgTable(
  "prompt_categories",
  {
    prompt_id: uuid("prompt_id").notNull().references(() => promptsTable.id, { onDelete: "cascade" }),

    category_id: uuid("category_id").notNull().references(() => categoriesTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey(table.prompt_id, table.category_id),
  })
);
