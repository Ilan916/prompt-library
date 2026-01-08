import { db } from "@/db";
import { promptsTable } from "@/db/schema/prompt";
import { desc } from "drizzle-orm/sql/expressions/select";

export async function getAllPrompts() {
  const prompts = await db
    .select({
      id: promptsTable.id,
      publicId: promptsTable.public_id,
      title: promptsTable.title,
      objective: promptsTable.objective,
      score: promptsTable.score,
      createdAt: promptsTable.created_at,
    })
    .from(promptsTable)
    .orderBy(
      desc(promptsTable.score),
      desc(promptsTable.created_at)
    );

  return prompts;
}
