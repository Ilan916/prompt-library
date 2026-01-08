import { getPromptBaseByPublicId } from "./getPromptBase";
import { getPromptSteps } from "./getPromptSteps";
import { getPromptCategories } from "./getPromptCategories";
import { getPromptAiModels } from "./getPromptAiModels";
import { getPromptAuthor } from "./getPromptAuthor";

export async function getPromptByPublicId(publicId: string) {
  const base = await getPromptBaseByPublicId(publicId);
  if (!base) return null;

  const [steps, categories, aiModels, author] = await Promise.all([
    getPromptSteps(base.id),
    getPromptCategories(base.id),
    getPromptAiModels(base.id),
    getPromptAuthor(base.authorId ?? null),
  ]);

  return {
    ...base,
    steps,
    categories,
    aiModels,
    author,
  };
}
