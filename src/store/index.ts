// store/index.ts
import { configureStore } from '@reduxjs/toolkit';
// import feedbackReducer from './feedback/slice';
// import shopReducer from './shop/slice';
// import userReducer from "./user/slice"
import { FeedbackStateV2, ShopState, UserStateInterface } from '@/types/states/States';
import { UseStore } from 'react-redux';

import feedbackReducer, { initialState as feedbackInitialState } from './feedback/slice';
import shopReducer, { initialState as shopInitialState } from './shop/slice';
import userReducer, { initialState as userInitialState } from "./user/slicev2";



export interface Store {
	feedback: FeedbackStateV2;
	user: UserStateInterface;
	shop: ShopState;
}



export const makeStore = () => {
	let preloadedState: Store = {
		feedback: feedbackInitialState,
		shop: shopInitialState,
		user: userInitialState,
	};


	if (typeof window !== 'undefined') {
		// --- Handle Feedback Slice ---
		const pendingFeedback = sessionStorage.getItem('feedback');
		if (pendingFeedback) {
			try {
				// Add the 'feedback' property to the existing preloadedState object
				preloadedState.feedback = JSON.parse(pendingFeedback);

				console.log('[HYDRATED] Restored feedback state from sessionStorage.');
				// console.log (`restored feedback: ${pendingFeedback}`);
				sessionStorage.removeItem('feedback');
			} catch (error) {
				console.error("Failed to parse pending feedback from sessionStorage", error);
				sessionStorage.removeItem('feedback');
			}
		}

		// --- Handle Shop Slice (Independently) ---
		const pendingShop = sessionStorage.getItem("shop");
		if (pendingShop) {
			try {
				// Add the 'shop' property to the existing preloadedState object
				preloadedState.shop = JSON.parse(pendingShop);

				console.log('[HYDRATED] Restored shop state from sessionStorage.');
				// console.log (`restored shop ${pendingShop}`);
				sessionStorage.removeItem("shop");
			} catch (error) {
				console.error("Failed to parse pending shop from sessionStorage", error);
				// Fix: This should remove 'shop', not 'feedback'
				sessionStorage.removeItem('shop');
			}
		}
	}





	return configureStore({
		reducer: {
			feedback: feedbackReducer,
			shop: shopReducer,
			user: userReducer
		},
		preloadedState
	})
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
