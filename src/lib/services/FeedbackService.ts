//lib/services/FeedbackService.ts

import { createSupabaseClient, getFromTableById, insertIntoTableAndReturn } from '../../server/supabase_client';
import { TableRecord, TableRecordV2 } from '../../types/primitives/TableRecord';
import { APIResponse, APIError } from '../../types/primitives/ExternalAPIResponse';
import { FeedbackV2, FeedbackV2Payload } from '@/types/primitives/Feedback';


export class FeedbackService {
	static async getById(id: string): Promise<APIResponse<FeedbackV2[], APIError>> {
		const client = await createSupabaseClient();
		const record: TableRecord = {
			Table: 'feedback_v2',
			Column: 'Id',
			Key: id
		};
		return await getFromTableById<FeedbackV2>(client, record);
	}

	static async getByShopId(shopId: string): Promise<APIResponse<FeedbackV2[], APIError>> {
		const client = await createSupabaseClient();
		const record: TableRecord = {
			Table: 'feedback_v2',
			Column: 'ShopId',
			Key: shopId
		};
		return await getFromTableById<FeedbackV2>(client, record);
	}

	static async create(feedback: FeedbackV2Payload): Promise<APIResponse<FeedbackV2Payload, APIError>> {
		try {
			const client = await createSupabaseClient();
			const now = new Date();

			const feedbackData: FeedbackV2Payload = {
				...feedback,
			};


			const record: TableRecordV2<FeedbackV2Payload> = {
				Table: 'feedback_v2',
				Column: 'ShopId',
				Data: feedbackData,
			};


			return await insertIntoTableAndReturn(client, record);

		// 	const { data, error, status } = await client
		// 		.from('feedback_v2')
		// 		.insert(feedbackData)
		// 		.select()
		// 		.single();

		// 	if (error) {
		// 		return {
		// 			Success: false,
		// 			Error: {
		// 				Message: error.message,
		// 				Code: error.code,
		// 				Details: error.details,
		// 			},
		// 			Status: status,
		// 		};
		// 	}

		// 	return {
		// 		Success: true,
		// 		Data: data,
		// 		Status: status,
		// 	};
		} catch (error) {
			return {
				Success: false,
				Error: {
					Message: error instanceof Error ? error.message : 'Unknown error',
					Code: 'FEEDBACK_CREATE_ERROR',
				},
			};
		}
	}
}
