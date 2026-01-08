import Link from "next/link";

type Prompt = {
  id: string;
  publicId?: string;
  title: string;
  objective: string;
  score?: number;
  createdAt?: string | Date;
  previewImageUrl?: string | null;
};

export default function PromptCard({ prompt }: { prompt: Prompt }) {
  return (
    <article className="bg-slate-800 rounded-2xl overflow-hidden shadow-md">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <h3 className="text-white text-lg font-bold leading-tight">{prompt.title}</h3>
            <p className="text-slate-300 text-sm mt-2 line-clamp-3">{prompt.objective}</p>

            <div className="mt-3 flex flex-wrap gap-2">
              <span className="text-slate-300 text-xs bg-slate-700/40 px-2 py-1 rounded-md">#devops</span>
              <span className="text-slate-300 text-xs bg-slate-700/40 px-2 py-1 rounded-md">#javascript</span>
            </div>
          </div>

          <div className="w-24 h-24 rounded-md bg-slate-700 overflow-hidden flex-shrink-0">
            {prompt.previewImageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={prompt.previewImageUrl} alt={prompt.title} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
            )}
          </div>
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-center justify-between text-slate-400 text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{prompt.score ?? 0}</span>
            </div>

            <div className="text-xs">{prompt.createdAt ? new Date(prompt.createdAt).toLocaleDateString() : "-"}</div>
          </div>

          <div className="flex items-center gap-3">
            <Link href={`/prompts/${prompt.publicId ?? prompt.id}`} className="text-slate-300 hover:text-white text-sm">
              Voir
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
