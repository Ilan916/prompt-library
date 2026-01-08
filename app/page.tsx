import { getAllPrompts } from "./(features)/Prompts/services/getAllPrompt";
import PromptList from "./(features)/Prompts/components/PromptList";

export default async function Home() {
  const prompts = await getAllPrompts();
  return (
    <div>
      <PromptList
        prompts={prompts.map((p) => ({
          id: p.id,
          publicId: p.publicId,
          title: p.title,
          objective: p.objective,
          score: p.score,
          createdAt: p.createdAt,
          previewImageUrl: null,
        }))}
      />
    </div>
  );
}
