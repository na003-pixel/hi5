// store/shop/slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Shop, ShopV2 } from '@/types/primitives/Shop';
import { APIResponse } from '@/types/primitives/ExternalAPIResponse';
import { ShopState } from '@/types/states/States';

export const fetchShop = createAsyncThunk(
	'shop/fetch',
	async (shopId: string) => {
		const response = await fetch(`/api/shop/${shopId}`);
		const result: APIResponse<Shop> = await response.json();

		if (!result.Success) {
			throw new Error(result.Error.Message);
		}

		console.log(result.Data);

		return result.Data;
	}
);





export const initialState: ShopState = {
	Item: null,
	IsSubmitting: false,
	IsLoading: false,
	Error: null,
};

const shopSlice = createSlice({
	name: 'shop',
	initialState,
	reducers: {
		setShopItem: (state, action: PayloadAction<Shop>) => {
			state.Item = action.payload;
			state.IsLoading = false;
			state.Error = null;
		},
		setShopV2Item: (state, action: PayloadAction<ShopV2>) => {
			// console.log ("ran");
			state.Item = action.payload;
			state.IsLoading = false;
			state.Error = null;
		},
		clearError: (state) => {
			state.Error = null;
		},
		resetShop: (state) => {
			state.Item = null;
			state.Error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchShop.pending, (state) => {
				state.IsLoading = true;
				state.Error = null;
			})
			.addCase(fetchShop.fulfilled, (state, action) => {
				const rawData = action.payload;

				// **TRANSFORMATION LOGIC**
				// Map the incoming lowercase properties to the PascalCase properties of your Shop type.
				const transformedShop: Shop = {
					Id: rawData.id,
					Name: rawData.name,
					Slug: rawData.slug,
				};

				state.IsLoading = false;
				state.Item = transformedShop; // Store the correctly shaped object
			})
			.addCase(fetchShop.rejected, (state, action) => {
				state.IsLoading = false;
				state.Error = action.error.message || 'Failed to fetch shop';
			})

	},
});

export const { setShopItem, setShopV2Item, clearError, resetShop } = shopSlice.actions;
export default shopSlice.reducer;
