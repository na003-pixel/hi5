import CustomerFeedbackTextForm from "@/components/CustomerFeedbackTextForm";
import ShopHeader from "@/components/ShopHeader";
import ShopPage from "../layout";
import { ShopPageProps } from '@/types/props/ShopPageProps';
import { use } from "react";
import SaveToDB from "@/components/Save";
import GoogleReviewsCard from "@/components/GoogleReviewPage";


export default function ReviewPagePage({ params }: ShopPageProps) {
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;


	return (
		<div className="flex flex-col items-center gap-8 mt-32">
			<ShopHeader slug={slug} />
			{/* <h1>Review Page</h1> */}
			<GoogleReviewsCard></GoogleReviewsCard>
		</div>
	);
}