"use client";

import { ShopPageProps } from '@/types/props/ShopPageProps';
import { use } from "react";
import GoogleReviewsCard from "@/components/GoogleReviewPage";
import { ImageHeader } from "@/components/ImageHeader";
import ShopHeaderV2 from "@/components/ShopHeaderV2";


export default function ReviewPagePage({ params }: ShopPageProps) {
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;


	return (
		<div className="flex flex-col items-center gap-8">
			<ImageHeader marginTop={8} />
			<ShopHeaderV2 />
			{/* <h1>Review Page</h1> */}
			<GoogleReviewsCard></GoogleReviewsCard>
		</div>
	);
}