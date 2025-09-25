import { mapPayloadToDBRow } from "@/lib/utils";
import { APIPayload } from "./ExternalAPIPayload";
import { DBRow, PropertyMapping } from "./TableRecord";

export const FeedbackRating = ["loved", "liked", "better", "poor"] as const;
export type FeedbackRatingType = typeof FeedbackRating[number];




export interface Feedback {
	ShopId: string;
	UserId: string;
	Timestamp: string;
	Date: string;
	Published: boolean;
	Rating: FeedbackRatingType;
	OriginalText: string;
	AiRefinedText?: string;
	UsedAi: boolean;
	IsAccurate: boolean;
}



export interface FeedbackV2 {
	ShopId: string;
	UserId: string;
	Timestamp: string;
	Date: string;
	Published: boolean;
	Rating: FeedbackRatingType;
	OriginalText?: string;
	AiRefinedText?: string;
	UsedAi: boolean;
	IsAccurate: boolean;
}


// export type FeedbackV2Payload = Omit<FeedbackV2, 
//     'UserId' | 'Timestamp' | 'Date' | 'Published' | 'IsAccurate'
// >;



export interface FeedbackV2Payload extends APIPayload {
	ShopId: string;
	UserId: string;
	Rating: string; // FeedbackRatingType
	OriginalText?: string;
	AiRefinedText?: string;
	UsedAi: boolean;
}

export interface FeedbackV2DBRow extends DBRow {
	shop_id: string;
	user_id: string;
	timestamp: string;
	date: string;
	published: boolean;
	rating: string;
	original_text?: string;
	ai_refined_text?: string;
	used_ai: boolean;
}

export const FEEDBACK_V2_MAPPING: PropertyMapping<FeedbackV2Payload, FeedbackV2DBRow> = {
	ShopId: 'shop_id',
	UserId: 'user_id',
	Rating: 'rating',
	OriginalText: 'original_text',
	AiRefinedText: 'ai_refined_text',
	UsedAi: 'used_ai',
} as const;


export function mapFeedbackV2PayloadToDB(
	payload: FeedbackV2Payload
): Partial<FeedbackV2DBRow> {
	return mapPayloadToDBRow<FeedbackV2Payload, FeedbackV2DBRow>(payload, FEEDBACK_V2_MAPPING);
}