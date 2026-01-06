import {
  pgTable,
  uuid,
  primaryKey,
} from "drizzle-orm/pg-core";

import { promptsTable } from "./prompt";
import { aiModelsTable } from "./ai_models";

export const promptAiModelsTable = pgTable(
  "prompt_ai_models",
  {
    prompt_id: uuid("prompt_id")
      .notNull()
      .references(() => promptsTable.id, { onDelete: "cascade" }),

    ai_model_id: uuid("ai_model_id")
      .notNull()
      .references(() => aiModelsTable.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey(table.prompt_id, table.ai_model_id),
  })
);
