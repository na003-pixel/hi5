"use client";

import { FeedbackRatingType, FeedbackRating } from "@/types/primitives/Feedback";
import GenericForm from "@/components/form/ButtonsForm";
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectSelectedRating, selectIsSubmitting } from '@/store/feedback/selectors';
import { setRating, submitFeedback } from '@/store/feedback/slice';
import { useRouter } from "next/navigation";

export function CustomerFeedbackRatingFormV2({ slug }: { slug: string }) {
	const dispatch = useAppDispatch();
	const selectedRating = useAppSelector(selectSelectedRating);
	const isSubmitting = useAppSelector(selectIsSubmitting);
	const router = useRouter ();

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
		router.push (`/shop/${slug}/feedback`);
	};

	return (
		<GenericForm<FeedbackRatingType>
			title="How was our service"
			description="Please rate our service"
			labels={labels}
			value={selectedRating}
			onChange={onSelect}
			onSubmit={onSubmit}
		/>
	);
}