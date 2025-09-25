// lib/services/shopService.ts
import { createSupabaseClient, getFromTableById, getFromTableByIdV2 } from '../../server/supabase_client';
import { TableRecord, TableRecordV3 } from '../../types/primitives/TableRecord';
import { APIResponse, APIError } from '../../types/primitives/ExternalAPIResponse';
import { Shop, ShopRecordInDB, ShopV2 } from '@/types/primitives/Shop';



export class ShopService {
	static async getById(id: string): Promise<APIResponse<Shop[], APIError>> {
		const client = await createSupabaseClient();
		const record: TableRecord = {
			Table: 'shops',
			Column: 'id',
			Key: id
		};
		return await getFromTableById<Shop>(client, record);
	}

	static async getByIdFull(id: string): Promise<APIResponse<ShopRecordInDB[], APIError>> {
		// console.log (id);
		const client = await createSupabaseClient();
		const record: TableRecordV3<ShopRecordInDB> = {
			Tables: new Map ([
				["shops", "shop_websites"]
			]),
			Column: 'shop_id',
			Key: id,
		}

		return await getFromTableByIdV2 <ShopRecordInDB> (client, record);
	}
}