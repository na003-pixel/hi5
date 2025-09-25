"use client";


import CustomerFeedbackTextForm from "@/components/CustomerFeedbackTextForm";
import ShopHeader from "@/components/ShopHeader";
import ShopPage from "../layout";
import { ShopPageProps } from '@/types/props/ShopPageProps';
import { use } from "react";
import ShopHeaderV2 from "@/components/ShopHeaderV2";


export default function FeedbackPagePage({ params }: ShopPageProps) {
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;

	return (
		<div className="flex flex-col items-center gap-8 mt-32">
			<ShopHeaderV2 />
			<CustomerFeedbackTextForm slug={slug} />
		</div>
	);
}