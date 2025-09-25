// components/ShopHeaderV3.tsx
'use client';

import { makeServerStore } from '@/server/store/serverStore';
import { useAppSelector } from '../store/hooks';
import { selectShopItem, selectShopLoading, selectShopError } from '../store/shop/selectors';

export default function ShopHeaderV3() {
	const shop = useAppSelector(selectShopItem);
	const loading = useAppSelector(selectShopLoading);
	const error = useAppSelector(selectShopError);

	// console.log (shop);

	// This component is much simpler. It directly renders based on the store's state.
	// The store is guaranteed to be populated by the server on the initial load.

	if (loading) {
		return (
			<div className="text-4xl font-bold tracking-tight text-center py-8 animate-pulse">
				<div className="h-8 bg-gray-300 rounded w-48 mx-auto"></div>
			</div>
		);
	}

	if (error) {
		return (
			<h1 className="text-4xl font-bold tracking-tight text-red-500 text-center py-8">
				Error: {error}
			</h1>
		);
	}

	if (shop?.Name) {
		return (
			<h1 className="text-4xl font-bold tracking-tight text-center py-8">
				{shop?.Name}
			</h1>
		);
	}

	return (
		<h1 className="text-4xl font-bold tracking-tight text-gray-500 text-center py-8">
			Shop Not Found
		</h1>
	);
}




