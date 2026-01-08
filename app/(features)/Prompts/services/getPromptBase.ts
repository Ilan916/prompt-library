import { db } from "@/db";
import { eq } from "drizzle-orm";
import { promptsTable } from "@/db/schema/prompt";

export async function getPromptBaseByPublicId(publicId: string) {
  const [prompt] = await db
    .select({
      id: promptsTable.id,
      publicId: promptsTable.public_id,
      title: promptsTable.title,
      objective: promptsTable.objective,
      score: promptsTable.score,
      previewImageUrl: promptsTable.preview_image_url,
      authorId: promptsTable.author_id,
      createdAt: promptsTable.created_at,
    })
    .from(promptsTable)
    .where(eq(promptsTable.public_id, publicId));

  return prompt ?? null;
}
