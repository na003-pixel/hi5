'use client';

import { use, useEffect } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchShop } from '@/store/shop/slice';
import ShopHeader from '@/components/ShopHeader';
import { CustomerFeedbackRatingFormV2 } from '@/components/CustomerFeedbackRatingFormV2';
import { ShopPageProps } from '@/types/props/ShopPageProps';
import ShopHeaderV2 from '@/components/ShopHeaderV2';
import { Link } from 'lucide-react';
import ShopHeaderV5 from '@/components/ShopHeaderV5';


export default function ShopLandingPage({ params }: ShopPageProps) {
	const dispatch = useAppDispatch();
	const resolvedParams = use(params);
	const slug = resolvedParams.slug;


	// useEffect(() => {
	// 	if (slug) {
	// 		dispatch(fetchShop(slug));
	// 	}
	// }, [dispatch, slug]);

	return (
		<div className="flex flex-col items-center gap-8 mt-32">
			<ShopHeaderV2 />
			<CustomerFeedbackRatingFormV2 slug={slug} />
			{/* <div className="text-center p-4 border rounded-lg bg-gray-900">
				<p className="text-lg font-semibold text-green-400">Correct Server-Side Redux Pattern</p>
				<p className="text-sm text-gray-300 mt-2">
					A full Redux store was created on the server. Actions were dispatched.
					The final state was serialized and used to hydrate the client store.
				</p>
				<Link href={`/thank-you`} className="text-blue-400 hover:underline mt-4 block">
					Go back to the original client-side fetch version
				</Link>
			</div> */}
		</div>
	);
}