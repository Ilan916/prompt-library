import { getPromptByPublicId } from "../../(features)/Prompts/services/getPromptByPublicId";
import Header from "../../components/Header";
import PromptDetail from "../../(features)/Prompts/components/PromptDetail";

type Props = { params: Promise<{ publicId: string }> };

export default async function PromptPage({ params }: Props) {
	const { publicId } = await params;

	const data = await getPromptByPublicId(publicId);

	if (!data) {
		return (
			<div>
				<Header />
				<div className="max-w-4xl mx-auto p-8 text-slate-200">Prompt non trouvé.</div>
			</div>
		);
	}

	return (
		<div className="pb-12">
			<Header />
			<main className="px-6 py-8">
				<PromptDetail data={data} />
			</main>
		</div>
	);
}

