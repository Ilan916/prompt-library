import { getAllPrompts } from "./(features)/Prompts/services/getAllPrompt";
import PromptList from "./(features)/Prompts/components/PromptList";

export default async function Home() {
  const prompts = await getAllPrompts();
  return (
    <div>
      <PromptList prompts={prompts} />
    </div>
  );
}
