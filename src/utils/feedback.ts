// utils/feedback.ts
import { FeedbackRatingType } from '../types/primitives/Feedback';

export function getRatingLabel(rating: FeedbackRatingType): string {
  const labels: Record<FeedbackRatingType, string> = {
    loved: 'Loved It!',
    liked: 'Liked It',
    better: 'Could Be Better',
    poor: 'Poor Experience'
  };
  return labels[rating];
}

export function getRatingColor(rating: FeedbackRatingType): string {
  const colors: Record<FeedbackRatingType, string> = {
    loved: 'text-green-500',
    liked: 'text-blue-500',
    better: 'text-yellow-500',
    poor: 'text-red-500'
  };
  return colors[rating];
}
