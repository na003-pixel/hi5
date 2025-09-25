// app/api/shop/[id]/route.ts
import { ShopService } from '@/lib/services/ShopService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	try {
		const { id } = await params;
		const result = await ShopService.getByIdFull(id);

		if (!result.Success) {
			return NextResponse.json(result, { status: result.Status || 500 });
		}

		if (!result.Data || result.Data.length === 0) {
			return NextResponse.json({
				Success: false,
				Error: {
					Message: 'Shop not found',
					Code: 'SHOP_NOT_FOUND',
				},
			}, { status: 404 });
		}

		// console.log (result.Data[0]);

		// Return single item for backward compatibility
		return NextResponse.json({
			Success: true,
			Data: result.Data[0],
			Status: result.Status,
		});
	} catch (error) {
		return NextResponse.json({
			Success: false,
			Error: {
				Message: error instanceof Error ? error.message : 'Unknown error',
				Code: 'SHOP_FETCH_ERROR',
			},
		}, { status: 500 });
	}
}