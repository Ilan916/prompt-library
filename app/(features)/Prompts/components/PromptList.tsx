import PromptCard from "./PromptCard";

type Prompt = {
  id: string;
  publicId?: string;
  title: string;
  objective: string;
  score?: number;
  createdAt?: string | Date;
  previewImageUrl?: string | null;
};

export default function PromptList({ prompts }: { prompts: Prompt[] }) {
  return (
    <section className="px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {prompts.map((p) => (
            <PromptCard
              key={p.id}
              prompt={{
                id: p.id,
                publicId: p.publicId,
                title: p.title,
                objective: p.objective,
                score: p.score,
                createdAt: p.createdAt,
                previewImageUrl: p.previewImageUrl ?? null,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
