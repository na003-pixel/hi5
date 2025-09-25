"use client";


import CustomerFeedbackTextForm from "@/components/CustomerFeedbackTextForm";
import ShopHeader from "@/components/ShopHeader";
import ShopPage from "../layout";
import { ShopPageProps } from '@/types/props/ShopPageProps';
import { use } from "react";
import ShopHeaderV2 from "@/components/ShopHeaderV2";
import { ImageHeaderV2 } from "@/components/ImageHeader";


export default function FeedbackPagePage({ params }: ShopPageProps) {
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;

	return (
		<div className="flex flex-col items-center gap-8 mt-32">
			<ShopHeaderV2 />
			<CustomerFeedbackTextForm slug={slug} />
		</div>
	);

	// return (
	// 			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8 min-h-screen">
	// 				{/* LEFT PANE: Takes 1 of 3 columns on medium screens and up */}
	// 				<div className="md:col-span-1 flex flex-col gap-8">
	// 					<ShopHeaderV2 />
	// 					<CustomerFeedbackTextForm slug={slug} />
	// 				</div>
		
	// 				{/* RIGHT PANE: Takes 2 of 3 columns on medium screens and up */}
	// 				<div className="md:col-span-2">
	// 					<ImageHeaderV2 fill={true} />
	// 				</div>
	// 			</div>
	// );
}