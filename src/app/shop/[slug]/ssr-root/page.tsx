import ShopHeaderV3 from "@/components/ShopHeaderV3";
import ShopHeaderV5 from "@/components/ShopHeaderV5";
import { GenericPageProps } from "@/types/props/GenericPageProps";
import Link from "next/link";

export default async function SSRRootPage({ children, params }: GenericPageProps) {
	const resolvedParams = await params;



	return (
		<div className="flex flex-col items-center gap-8 mt-32">
			<ShopHeaderV5 slug={resolvedParams.slug} />
			<div className="text-center p-4 border rounded-lg bg-gray-900">
				<p className="text-lg font-semibold text-green-400">Correct Server-Side Redux Pattern</p>
				<p className="text-sm text-gray-300 mt-2">
					A full Redux store was created on the server. Actions were dispatched.
					The final state was serialized and used to hydrate the client store.
				</p>
				<Link href={`/thank-you`} className="text-blue-400 hover:underline mt-4 block">
					Go back to the original client-side fetch version
				</Link>
			</div>
		</div>
	);
}