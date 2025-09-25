// store/feedback/selectors.ts
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../index';

const MIN_LENGTH = 30;
export const selectFeedbackState = (state: RootState) => state.feedback;


export const selectFeedbackItem = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.Item
);

export const selectSelectedRating = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.SelectedRating
);

export const selectFeedbackText = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.FeedbackText
);

export const selectOriginalText = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.OriginalText
);

export const selectAIRefinedText = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.AiRefinedText
);

export const selectIsSubmitting = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.IsSubmitting
);

export const selectIsEnhancing = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.IsEnhancing
);

export const selectFeedbackError = createSelector(
	[selectFeedbackState],
	(feedbackState) => feedbackState.Error
);

export const selectIsValidLength = createSelector(
	[selectOriginalText],
	(originalText) => originalText ? originalText.length >= MIN_LENGTH : false
);


export const selectCanSubmit = createSelector(
	[selectSelectedRating, selectIsValidLength, selectIsSubmitting],
	(rating, isValid, isSubmitting) => rating !== null && isValid && !isSubmitting
);
