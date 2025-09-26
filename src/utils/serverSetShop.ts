import { ShopService } from "@/lib/services/ShopService";
import { makeServerStore, RootState } from "@/server/store/serverStore";
import { setShopItem, setShopV2Item } from "@/store/shop/slice";
import { Shop, ShopRecordInDB, ShopV2 } from "@/types/primitives/Shop";






export async function getServerStoreForShopV2(slug: string) {
	const serverStore = makeServerStore();
	const result = await ShopService.getByIdFull(slug);
	// console.log (result);

	if (result.Success) {
		const rawData: ShopRecordInDB = result.Data [0];
		const transformedShop: ShopV2 = {
			Id: rawData.shops.id,
			Name: rawData.shops.name,
			OwnerName: rawData.shops?.owner_name,

			Email: rawData.shops?.email,
			Phone: rawData.shops?.phone,

			Industry: rawData.shops.industry,
			Type: rawData.shops.type,

			Website: rawData?.website_url,
			ReviewLink: rawData.google_review_link,
		}

		serverStore.dispatch (setShopV2Item (transformedShop));
	}

	return serverStore;


}