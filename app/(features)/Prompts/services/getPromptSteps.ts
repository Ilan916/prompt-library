import { db } from "@/db";
import { eq } from "drizzle-orm";
import { promptStepsTable } from "@/db/schema/prompt_steps";
import { asc } from "drizzle-orm";

export async function getPromptSteps(promptId: string) {
  const steps = await db
    .select({
      id: promptStepsTable.id,
      role: promptStepsTable.role,
      content: promptStepsTable.content,
      order: promptStepsTable.step_order,
      createdAt: promptStepsTable.created_at,
    })
    .from(promptStepsTable)
    .where(eq(promptStepsTable.prompt_id, promptId))
    .orderBy(asc(promptStepsTable.step_order));

  return steps;
}
