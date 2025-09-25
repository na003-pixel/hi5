// src/lib/services/AIService.ts
import { FeedbackRatingType } from "@/types/primitives/Feedback";
import { APIResponse, APIError } from "../../types/primitives/ExternalAPIResponse";
import { ShopService } from "./ShopService";
import { collectMeta } from "next/dist/build/utils";

interface ShopContext {
	industry: string | null;
	type: string | null;
	owner_name?: string;
	name?: string;
}



export class AIService {
	static async enhanceText(
		text: string,
		rating: FeedbackRatingType,
		shopId: string
	): Promise<APIResponse<string, APIError>> {

		if (!process.env.PERSONAL_GEMINI_API_KEY_FREE) {
			return {
				Success: false,
				Error: {
					Message: 'Gemini API key not configured',
					Code: 'NO_API_KEY',
				},
				Status: 500,
			};
		}

		if (!text?.trim()) {
			return {
				Success: false,
				Error: {
					Message: 'Text content is required',
					Code: 'INVALID_INPUT',
				},
				Status: 400,
			};
		}

		try {
			const shopContext = await this.getShopContext(shopId);
			const enhancedText = await this.callGeminiAPI(text, rating, shopContext);

			return {
				Success: true,
				Data: enhancedText,
				Status: 200,
			};

		}

		catch (error: any) {
			console.error('AI Enhancement error:', error);
			return {
				Success: false,
				Error: {
					Message: error.message || 'Unknown enhancement error',
					Code: 'ENHANCEMENT_EXCEPTION',
					Details: error,
				},
				Status: 500,
			};
		}
	}

	private static async getShopContext(shopId: string): Promise<ShopContext> {
		const defaultContext: ShopContext = {
			industry: null,
			type: null,
		};

		const shopRecord = await ShopService.getByIdFull(shopId);

		if (!shopRecord.Success) {
			console.warn(`Shop service failed for ${shopId} - using defaults`);
			return defaultContext;
		}

		if (!shopRecord.Data) {
			console.warn(`No shop data returned for ${shopId} - using defaults`);
			return defaultContext;
		}

		if (shopRecord.Data.length === 0) {
			console.warn(`Empty shop data array for ${shopId} - using defaults`);
			return defaultContext;
		}

		return {
			industry: shopRecord.Data[0].shops.industry ?? null,
			type: shopRecord.Data[0].shops.type ?? null,
			owner_name: shopRecord.Data[0].shops.owner_name,
			name: shopRecord.Data[0].shops.name,
		};
	}

	private static async callGeminiAPI(
		text: string,
		type: FeedbackRatingType,
		shopContext: ShopContext
	): Promise<string> {
		// console.log (shopContext);
		const isPositive = type === "loved" || type === "liked";
		const contextStr = `Context: the business is a ${shopContext.type ?? "unknown"}. Business name is "${shopContext.name}" and owner's name is ${shopContext.owner_name}.`;
		// console.log(`${contextStr}`);

		const prompt = isPositive
			? `Enhance this positive review to make it more articulate, professional, and polished, while keeping the original sentiment intact.  Use simple, natural, human-like language, but don't make it conversational. This is a customer review for shop/business, not a board meeting. ${contextStr}\n\nPersonalize it with names. Return only one improved version, not multiple options. Original user-provided review:\n\n"${text}"`
			: `Take the following negative feedback and rewrite it as constructive criticism for stakeholders. ${contextStr}\n\nKeep it concise, professional. Keep it solution-oriented, but keep them absolutely basic and high-level only. Don't give detailed, technical solutions. Use simple, natural, human-like language, but don't make it conversational. Personalize it with names. Highlight the core issues clearly, and frame them as actionable improvements so stakeholders understand what can be done better and why. Original user-provided review:\n\n"${text}"`;



		// console.log (prompt);




		try {
			const response = await fetch(
				`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						"X-GOOG-API-KEY": `${process.env.PERSONAL_GEMINI_API_KEY_FREE}`
					},
					body: JSON.stringify({
						contents: [
							{
								parts: [{ text: prompt }],
							},
						],
					}),
				}
			);

			if (!response.ok) {
				const errorText = await response.text();
				throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
			}

			const data = await response.json();
			const enhancedText = data.candidates?.[0]?.content?.parts?.[0]?.text;

			if (!enhancedText) {
				throw new Error('Gemini API did not return enhanced text');
			}

			return enhancedText;

		} catch (error) {
			console.error('Gemini API call failed:', error);
			throw error;
		}
	}
}