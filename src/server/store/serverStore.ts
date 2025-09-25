import { configureStore, combineReducers } from '@reduxjs/toolkit';
import feedbackReducer from '../../store/feedback/slice';
import shopReducer from '../../store/shop/slice';
import userReducer from "../../store/user/slicev2";

// Combine reducers explicitly
const rootReducer = combineReducers({
    feedback: feedbackReducer,
    shop: shopReducer,
    user: userReducer,
});

// Define RootState type from the combined reducer
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Creates a Redux store. This function is designed to be used on both the
 * server and the client.
 */
export const makeServerStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
};

// Export the store and state types
export type ServerAppStore = ReturnType<typeof makeServerStore>;
export type ServerRootState = ReturnType<ServerAppStore['getState']>;



