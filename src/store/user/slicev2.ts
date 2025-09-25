import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserInterface } from "@/types/primitives/User";
import { UserStateInterface } from "@/types/states/States";

export const initialState: UserStateInterface = {
	user: {
		isSignedIn: false,
		token: null,
		userId: null,
		name: "",
		email: "",
		phone: null,
		createdAt: null,
	},
	loading: true, // Start as loading until the first sync.
	error: null,
};

const userSliceV2 = createSlice({
	name: "user",
	initialState,
	reducers: {
		// Action to update the user state from Clerk's data.
		syncUser: (state, action: PayloadAction<Partial<UserInterface>>) => {
			state.user = { ...state.user, ...action.payload };
			state.loading = false; // Sync is complete.
			state.error = null;
		},
		setUserLoading: (state, action: PayloadAction<boolean>) => {
			state.loading = action.payload;
		},
		clearUser: () => initialState,
	},
});

export const { syncUser, setUserLoading, clearUser } = userSliceV2.actions;
export default userSliceV2.reducer;