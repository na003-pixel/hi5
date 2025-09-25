import { Feedback, FeedbackRatingType, FeedbackV2 } from "../primitives/Feedback";
import { Shop, ShopV2 } from "../primitives/Shop";
import { UserInterface } from "../primitives/User";

export interface FeedbackState {
	Item: Feedback | null;
	IsSubmitting: boolean;
	IsLoading: boolean;
	Error: string | null;
	SelectedRating: FeedbackRatingType | null;
	FeedbackText: string;
	IsEnhancing: boolean;
}


export interface FeedbackStateV2 {
	Item: FeedbackV2 | null;
	IsSubmitting: boolean;
	IsLoading: boolean;
	Error: string | null;
	SelectedRating: FeedbackRatingType | null;
	FeedbackText: string;
	IsEnhancing: boolean;

	// extension to initial feedback state
	OriginalText?: string;
	AiRefinedText?: string;
	UsedAi: boolean;
}




export interface ShopState {
	Item: Shop | ShopV2 | null;
	IsSubmitting: boolean;
	IsLoading: boolean;
	Error: string | null;
}






export interface UserStateInterface {
	user: UserInterface,
	loading: boolean;
	error: string | null;
}

