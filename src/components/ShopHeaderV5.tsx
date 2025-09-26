import { ShopService } from "@/lib/services/ShopService";
import { makeServerStore } from "@/server/store/serverStore";
import { setShopItem } from "@/store/shop/slice";
import { Shop } from "@/types/primitives/Shop";
import { GenericPageProps } from "@/types/props/GenericPageProps";
import ShopHeaderV3 from "./ShopHeaderV3";
import { getServerStoreForShopV2 } from "@/utils/serverSetShop";
import HybridReduxProvider from "@/server/store/HybridReduxProvider";

export default async function ShopHeaderV5({ slug }: { slug: string }) {

	const serverStore = await getServerStoreForShopV2(slug);
	const preloadedState = serverStore.getState();
	// console.log (preloadedState);


	return (
		<HybridReduxProvider preloadedState={preloadedState}>
			<ShopHeaderV3 />
		</HybridReduxProvider>

	)


}