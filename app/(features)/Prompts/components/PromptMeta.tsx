export default function PromptMeta({ data }: { data: any }) {
  return (
    <div className="flex items-center justify-between gap-4 text-slate-300 text-sm">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 5v14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5 12h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-slate-200 font-semibold">{data.score ?? 0}</span>
        </div>

        <div>{data.createdAt ? new Date(data.createdAt).toLocaleDateString() : "-"}</div>
      </div>

      <div className="flex items-center gap-2">
        {data.categories && data.categories.map((c: any) => (
          <span key={c.id} className="text-xs px-2 py-1 bg-slate-700/40 rounded-md">{c.name}</span>
        ))}

        {data.aiModels && (
          <div className="ml-2 flex items-center gap-2">
            {data.aiModels.map((m: any) => (
              <span key={m.id} className="text-xs px-2 py-1 bg-slate-700/30 rounded-md">{m.name}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
