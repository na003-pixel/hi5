import HybridReduxProvider from "@/server/store/HybridReduxProvider";
import { StoreProvider } from "@/store/StoreProvider";
import { ShopLayoutProps, ShopLayoutPropsV2 } from "@/types/props/ShopPageProps";
import { getServerStoreForShopV2 } from "@/utils/serverSetShop";
import React from "react";




export default async function ShopPage({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ slug: string }>;
}) {
	const resolvedParams = await params;

	const serverStore = await getServerStoreForShopV2(resolvedParams.slug);
	const preloadedState = serverStore.getState();
	return (
		<HybridReduxProvider preloadedState={preloadedState}>{children}</HybridReduxProvider>
		// <StoreProvider>{children}</StoreProvider>
	);
}