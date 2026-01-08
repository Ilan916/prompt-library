import { db } from "@/db";
import { eq } from "drizzle-orm";
import { promptCategoriesTable } from "@/db/schema/prompt_categories";
import { categoriesTable } from "@/db/schema/categories";

export async function getPromptCategories(promptId: string) {
  const categories = await db
    .select({ id: categoriesTable.id, name: categoriesTable.name, slug: categoriesTable.slug })
    .from(promptCategoriesTable)
    .innerJoin(categoriesTable, eq(promptCategoriesTable.category_id, categoriesTable.id))
    .where(eq(promptCategoriesTable.prompt_id, promptId));

  return categories;
}
