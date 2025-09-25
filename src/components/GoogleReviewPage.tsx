"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { useAppSelector } from "@/store/hooks";
import { selectShopItem } from "@/store/shop/selectors";
import { Shop, ShopV2 } from "@/types/primitives/Shop";


export default function GoogleReviewsCard() {
	const shop: Shop | ShopV2 | null = useAppSelector(selectShopItem);
	const reviewHref =
		shop
		&& "ReviewLink" in shop
		&& shop.ReviewLink
			? shop.ReviewLink
			: "/thank-you";




	return (
		<>
			<Card className="p-6 text-center flex flex-col">
				<CardHeader>
					<CardTitle className="text-xl font-semibold text-white">
						One last step
					</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="w-full flex flex-col items-center space-y-6">
						<Link
							href={`${reviewHref}`}
							className="w-full p-6 text-center rounded-xl font-semibold transition border border-neutral-800 hover:bg-neutral-800"
						>
							Rate us on Google!
						</Link>

						{/* <Link
							href="/thank-you"
							className="w-full p-6 text-center rounded-xl font-semibold transition border border-neutral-800 hover:bg-neutral-800"
						>
							No, Thank You!
						</Link> */}
					</div>
				</CardContent>

			</Card>



		</>
	)
}