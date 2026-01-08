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

  // Debug logging to help trace why steps may be missing
  try {
    // eslint-disable-next-line no-console
    console.log(`getPromptByPublicId: base.id=${base.id} publicId=${publicId} steps=${steps?.length ?? 0}`);
  } catch (e) {
    /* ignore logging errors */
  }

  return {
    ...base,
    steps,
    categories,
    aiModels,
    author,
  };
}
