// ../hi5-v2/src/components/ShopHeader.tsx
// components/ShopHeader.tsx
'use client';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectShopItem, selectShopLoading, selectShopError } from '../store/shop/selectors';
import { fetchShop } from '../store/shop/slice';

interface ShopHeaderProps {
	ShopId: string;
}

export default function ShopHeader({ slug }: { slug: string }) {
	const dispatch = useAppDispatch();
	const shop = useAppSelector(selectShopItem);
	const loading = useAppSelector(selectShopLoading);
	const error = useAppSelector(selectShopError);

	const [isClient, setIsClient] = useState(false);

	// console.log('Shop object from Redux store:', shop);

	// useEffect(() => {
	// 	if (!shop) {
	// 		dispatch(fetchShop(slug));
	// 	}
	// }, [dispatch, slug]);

	// useEffect (() => {
	// 	setIsClient (true);
	// }, []);

	// if (!isClient) {
	// 	return;
	// }


	if (loading) {
		return <h1 className="text-4xl font-bold tracking-tight text-center py-8">Loading...</h1>;
	}

	if (error) {
		return (
			<h1 className="text-4xl font-bold tracking-tight text-red-500 text-center py-8">
				Error: {error || 'Failed to load shop'}
			</h1>
		);
	}

	if (shop) {

		return (
			<h1 className="text-4xl font-bold tracking-tight text-center py-8">{shop?.Name}</h1>
		);
	}

	return null;
}