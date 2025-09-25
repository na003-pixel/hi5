
// store/feedback/slice.ts
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FeedbackRatingType, FeedbackV2, FeedbackV2Payload, mapFeedbackV2PayloadToDB } from '@/types/primitives/Feedback';
import { FeedbackStateV2 } from '@/types/states/States';
import { APIError, APIResponse } from '../../types/primitives/ExternalAPIResponse';
import { RootState } from '@/store/index';
import { selectShopItem } from '../shop/selectors';
import { selectFeedbackState } from './selectors';
import { selectUser } from '../user/selectors';



export const submitFeedback = createAsyncThunk<
	FeedbackV2, // Type of the return value on success
	void,      // Type of the thunk argument (void means no argument)
	{          // ThunkAPI options
		state: RootState,
		rejectValue: string
	}
>(
	'feedback/submit',
	async (_, { rejectWithValue, getState }) => {
		const state = getState() as RootState;
		// console.log(JSON.stringify(state));

		const shop = selectShopItem(state);
		const feedback = selectFeedbackState(state);
		const user = selectUser(state);
		console.log(`shop: ${JSON.stringify(shop)}`);
		console.log(`feedback: ${JSON.stringify(feedback)}`);
		console.log(`user: ${JSON.stringify(user)}`);

		if (!shop?.Id || !feedback?.SelectedRating) {
			return rejectWithValue('Missing shop information or rating. Cannot submit.');
		}

		const payload: FeedbackV2Payload = {
			ShopId: shop.Id,
			UserId: user.userId ?? "",
			Rating: feedback.SelectedRating,
			OriginalText: feedback.OriginalText ?? undefined,
			AiRefinedText: feedback.AiRefinedText ?? undefined,
			UsedAi: feedback.UsedAi,
		};

		const dbRow = mapFeedbackV2PayloadToDB(payload);
		// console.log (`DB Row to be inserted: ${JSON.stringify (dbRow)}`);
		// console.log('Exact payload being sent:', Object.keys(dbRow));
		// console.log (feedback.OriginalText);
		const response = await fetch('/api/feedback', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(dbRow),
		});

		const result: APIResponse<FeedbackV2> = await response.json();

		if (!result.Success) {
			throw new Error(result.Error.Message);
		}

		return result.Data;
	}
);



export const enhanceFeedback = createAsyncThunk<
	string, // Return type (the enhanced text)
	string, // Argument type (the text to enhance)
	{
		state: RootState,
		rejectValue: string
	}
>(
	'feedback/enhance',
	async (text: string, { rejectWithValue, getState }) => {
		const state = getState() as RootState;

		const shop = selectShopItem(state);
		const feedback = selectFeedbackState(state);

		if (!shop?.Id || !feedback?.SelectedRating) {
			return rejectWithValue('Missing shop information or rating. Cannot enhance.');
		}

		const response = await fetch('/api/ai/enhance', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				Text: {
					text: text,
					rating: feedback.SelectedRating,
					shopId: shop.Id
				}
			}),
		});

		const result: APIResponse<string, APIError> = await response.json();
		console.log(response);


		if (!result.Success) {
			return rejectWithValue(result.Error?.Message || 'Enhancement failed');
		}

		return result.Data; // We know Data exists when Success is true
	}
);



export const initialState: FeedbackStateV2 = {
	Item: null,
	IsSubmitting: false,
	IsLoading: false,
	Error: null,
	SelectedRating: null,
	FeedbackText: '',
	IsEnhancing: false,

	OriginalText: "",
	AiRefinedText: "",
	UsedAi: false
};

const feedbackSlice = createSlice({
	name: 'feedback',
	initialState,
	reducers: {
		setRating: (state, action: PayloadAction<FeedbackRatingType>) => {
			state.SelectedRating = action.payload;
		},
		setIsEnhancing: (state, action: PayloadAction<boolean>) => {
			// console.log ("in feedback slice");
			// console.log (action.payload);
			state.IsEnhancing = action.payload;
		},
		setFeedbackText: (state, action: PayloadAction<string>) => {
			state.FeedbackText = action.payload;
		},
		setOriginalText: (state, action: PayloadAction<string>) => {
			// console.log ("in feedback slice");
			// console.log (action.payload);
			state.OriginalText = action.payload;
		},
		setAiRefinedText: (state, action: PayloadAction<string>) => {
			state.AiRefinedText = action.payload;
		},
		clearError: (state) => {
			state.Error = null;
		},
		resetForm: (state) => {
			state.SelectedRating = null;
			state.FeedbackText = '';
			state.OriginalText = '';
			state.UsedAi = false;
			state.Error = null;
			state.Item = null;
		},
		resetFeedbackState(state) {
			state.SelectedRating = null;
			state.IsSubmitting = false;
			state.Error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(submitFeedback.pending, (state) => {
				state.IsSubmitting = true;
				state.Error = null;
			})
			.addCase(submitFeedback.fulfilled, (state, action) => {
				state.IsSubmitting = false;
				state.Item = action.payload;
				state.SelectedRating = null;
				state.OriginalText = '';
				state.AiRefinedText = '';
				state.FeedbackText = '';
				state.UsedAi = false;
			})
			.addCase(submitFeedback.rejected, (state, action) => {
				state.IsSubmitting = false;
				state.Error = action.error.message || 'Failed to submit feedback';
			})
			.addCase(enhanceFeedback.pending, (state) => {
				state.IsEnhancing = true;
				state.Error = null;
			})
			.addCase(enhanceFeedback.fulfilled, (state, action) => {
				// console.log('REDUCER - Before:', (state.OriginalText));
				// console.log('REDUCER - Payload:', action.payload);
				state.IsEnhancing = false;
				state.OriginalText = action.payload;
				state.AiRefinedText = action.payload;
				state.UsedAi = true;
			})
			.addCase(enhanceFeedback.rejected, (state, action) => {
				state.IsEnhancing = false;
				state.Error = action.error.message || 'Failed to enhance feedback';
			});
	},
});

export const { setRating, setIsEnhancing, setFeedbackText, setOriginalText, setAiRefinedText, clearError, resetForm, resetFeedbackState } = feedbackSlice.actions;
export default feedbackSlice.reducer;
