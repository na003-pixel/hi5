//app/api/feedback/route.ts
import { FeedbackService } from '@/lib/services/FeedbackService';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
	const requestId = Math.random().toString(36).substr(2, 9);
	// console.log(`[${requestId}] API Route called`);
	try {
		const dbRow = await request.json();
		// console.log(`[${requestId}] Received dbRow:`, dbRow);

		const result = await FeedbackService.create(dbRow);
		// console.log(`[${requestId}] Insert result:`, result.Success);

		return NextResponse.json(result, {
			status: result.Success ? 200 : (result.Status || 500)
		});
	}
	catch (error) {
		return NextResponse.json({
			Success: false,
			Error: {
				Message: error instanceof Error ? error.message : 'Unknown error',
				Code: 'FEEDBACK_CREATE_ERROR',
			},
		}, { status: 500 });
	}
}