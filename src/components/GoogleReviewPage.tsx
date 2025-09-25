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
			<Card className="py-2 px-10 text-center flex flex-col mx-auto">
				<CardHeader>
					<CardTitle className="text-xl font-semibold">
						One last step
					</CardTitle>
				</CardHeader>

				<CardContent>
					<div className="py-4 mx-auto mt-2 items-center space-y-6">
						<Link
							href={`${reviewHref}`}
							className="w-full py-6 px-10 text-center rounded-xl font-semibold transition border border-border hover:bg-accent hover:text-accent-foreground"
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