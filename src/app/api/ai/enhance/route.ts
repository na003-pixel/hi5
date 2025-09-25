// app/api/ai/enhance/route.ts
import { AIService } from '@/lib/services/AIService';
import { FeedbackRatingType } from '@/types/primitives/Feedback';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	try {
		const { Text }: {
			Text: {
				text: string;
				shopId: string;
				rating: FeedbackRatingType;
			}
		} = await request.json();

		// Simulate AI enhancement
		// await new Promise(resolve => setTimeout(resolve, 100));

		const enhancedText = await AIService.enhanceText(
			Text.text,
			Text.rating,
			Text.shopId
		);


		return NextResponse.json(enhancedText, {
			status: enhancedText.Success ? 200 : (enhancedText.Status || 500)
		});
	}

	catch (error) {
		return NextResponse.json({
			Success: false,
			Error: error instanceof Error ? error.message : 'Enhancement failed'
		},
			{
				status: 500

			});
	}
}