import PromptMeta from "./PromptMeta";
import PromptSteps from "./PromptSteps"
import Author from "../types/authorType";


export default function PromptDetail({ data }: { data: any & { author?: Author } }) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-slate-900 rounded-2xl overflow-hidden shadow-lg">
        {data.previewImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={data.previewImageUrl} alt={data.title} className="w-full h-64 object-cover" />
        )}

        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">{data.title}</h1>
          <p className="text-slate-300 mt-3">{data.objective}</p>

          <div className="mt-4">
            <PromptMeta data={data} />
          </div>
        </div>
      </div>

      <div className="mt-6">
        <PromptSteps steps={data.steps ?? []} />
      </div>
    </div>
  );
}
