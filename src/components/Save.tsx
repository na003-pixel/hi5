"use client";

import { useEffect, useState } from "react";
import { submitFeedback } from "@/store/feedback/slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { selectShopState } from "@/store/shop/selectors";
import { useRouter } from "next/navigation";
import { selectFeedbackState } from "@/store/feedback/selectors";
import { useClerkRedux } from "@/app/hooks/useClerkRedux";
import { selectUserState } from "@/store/user/selectors";

export default function SaveToDB() {
	const dispatch = useAppDispatch();
	const router = useRouter();

	const { isClerkLoaded } = useClerkRedux();

	// 2. Select all necessary state from Redux.
	const shopState = useAppSelector(selectShopState);
	const feedbackState = useAppSelector(selectFeedbackState);
	const reduxUser = useAppSelector(selectUserState); // <-- Select the user state.

	const [isClient, setIsClient] = useState(false);
	useEffect(() => { setIsClient(true) }, []);

	useEffect(() => {
		// --- GUARD CLAUSES ---

		// Wait for client mount and store hydration.
		if (!isClient || !shopState.Item) {
			return;
		}

		// Wait for the sync hook to confirm Clerk is loaded.
		if (!isClerkLoaded) {
			return;
		}

		// FINAL GATE: Wait for the user ID to be present in the Redux store.
		// This confirms the sync from our hook has completed.
		if (!reduxUser.user.userId) {
			// console.log (`clerk user: ${reduxUser.user.userId}`);
			console.log("SaveToDB: User is authenticated, waiting for Redux user state to sync...");
			return;
		}


		const submitProcess = async () => {
			try {

				console.log("SaveToDB: Component rendered, user is authenticated. Submitting...");
				await dispatch(submitFeedback()).unwrap();

				console.log("SaveToDB: Submission successful.");
				const rating = feedbackState.SelectedRating;
				if (rating === "loved" || rating === "liked") {
					console.log("{good}");
					router.push(`/shop/${shopState.Item?.Id}/review`);
				}
				else {
					console.log("{poor}");
					router.push(`/thank-you`);
				}
			} catch (error) {
				console.error("SaveToDB: Submission process failed:", error);
				router.push(`/shop/${shopState.Item?.Slug}/`);
			}
		};

		submitProcess();

	}, [isClient, shopState.Item]); // Effect depends only on hydration

	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-2xl font-semibold mb-4">Saving your feedback...</h1>
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
			</div>
		</div>
	);
}