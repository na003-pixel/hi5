"use client";

import { FeedbackRatingType, FeedbackRating } from "@/types/primitives/Feedback";
import GenericForm from "@/components/form/ButtonsForm";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedRating, selectIsSubmitting } from '@/store/feedback/selectors';
import { resetFeedbackState, setRating, submitFeedback } from '@/store/feedback/slice';
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function CustomerFeedbackRatingFormV2({ slug }: { slug: string }) {
	const dispatch = useAppDispatch();
	const selectedRating = useAppSelector(selectSelectedRating);
	const isSubmitting = useAppSelector(selectIsSubmitting);
	const router = useRouter()
	const isInitialMount = useRef(true);

	const labels: Record<FeedbackRatingType, string> = {
		loved: "Loved it",
		liked: "Liked it",
		better: "Can be better",
		poor: "Far from good"
	};

	const onSelect = async (rating: FeedbackRatingType) => {
		dispatch(setRating(rating));
		console.log('Selected:', rating);
		// await onSubmit();
	};

	const onSubmit = async () => {
		if (!selectedRating || isSubmitting) return;

		console.log('[SUBMITTED] Ratings');
		console.log(`${selectedRating}`);
		router.push(`/shop/${slug}/feedback`);
	};



	// // This effect now triggers the submission ONLY when a NEW selection is made.
	// useEffect(() => {
	// 	// Do nothing if there is no rating selected.
	// 	if (!selectedRating) {
	// 		return;
	// 	}
		
	// 	onSubmit();

	// // We only want this effect to run when the rating changes, not on every render.
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [selectedRating]);

	// // NEW: This effect cleans up the state when the component is unmounted.
	// useEffect(() => {
	// 	// The returned function is the "cleanup" function.
	// 	// It runs when the component unmounts (e.g., when router.push succeeds).
	// 	return () => {
	// 		dispatch(resetFeedbackState());
	// 	};
	// }, [dispatch]); // dispatch is stable, so this effect runs once on mount and cleans up on unmount.


	return (
		<GenericForm<FeedbackRatingType>
			title="How was our service"
			// description="Please rate our service"
			description=""
			labels={labels}
			value={selectedRating}
			onChange={onSelect}
			onSubmit={onSubmit}
		/>
	);
}