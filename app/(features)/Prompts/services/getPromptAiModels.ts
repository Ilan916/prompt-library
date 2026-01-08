import { db } from "@/db";
import { eq } from "drizzle-orm";
import { promptAiModelsTable } from "@/db/schema/prompt_ai_models";
import { aiModelsTable } from "@/db/schema/ai_models";

export async function getPromptAiModels(promptId: string) {
  const aiModels = await db
    .select({ id: aiModelsTable.id, name: aiModelsTable.name, slug: aiModelsTable.slug })
    .from(promptAiModelsTable)
    .innerJoin(aiModelsTable, eq(promptAiModelsTable.ai_model_id, aiModelsTable.id))
    .where(eq(promptAiModelsTable.prompt_id, promptId));

  return aiModels;
}
