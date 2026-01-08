export default function PromptSteps({ steps }: { steps: Array<any> }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <h2 className="text-lg font-semibold text-white mb-3">Étapes</h2>

      {!steps || steps.length === 0 ? (
        <div className="text-slate-400">Aucune étape disponible pour ce prompt.</div>
      ) : (
        <ol className="space-y-3">
          {steps.map((s: any) => (
            <li key={s.id} className="p-3 bg-slate-700 rounded-md">
              <div className="text-slate-200 font-medium">{s.role}</div>
              <div className="text-slate-300 text-sm mt-1">{s.content}</div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
