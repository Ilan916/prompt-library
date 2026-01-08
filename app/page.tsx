import { getAllPrompts } from "./(features)/Prompts/services/getAllPrompt";
import Header from "./components/Header";
import PromptList from "./(features)/Prompts/components/PromptList";

export default async function Home() {
  const prompts = await getAllPrompts();
  return (
    <div>
      <Header />
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
