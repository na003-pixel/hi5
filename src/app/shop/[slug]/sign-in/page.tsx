import { ShopPageProps } from '@/types/props/ShopPageProps';
import { use } from "react";
import { AuthFormV2 } from "@/components/SignInForm";

export default function SignInPagePage({ params }: ShopPageProps) {
	const resolvedParams = use(params);


	return (
			<div className="flex flex-col items-center gap-8 mt-32">
				{/* <ShopHeader slug={slug} /> */}
				<AuthFormV2 />
			</div>
	);
}