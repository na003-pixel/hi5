// components/FeedbackTextArea.tsx
'use client';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
	selectFeedbackText,
	selectIsEnhancing,
	selectIsValidLength,
	selectIsSubmitting,
	selectOriginalText,
	selectAIRefinedText,
	selectFeedbackState
} from '../store/feedback/selectors';
import { enhanceFeedback, setOriginalText, setIsEnhancing } from '../store/feedback/slice';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { useRouter } from "next/navigation";
import React from 'react';
import { selectShopItem, selectShopState } from '@/store/shop/selectors';


export default function CustomerFeedbackTextForm({ slug }: { slug: string }) {
	const dispatch = useAppDispatch();
	const feedback = useAppSelector(selectFeedbackState);
	const feedbackText = useAppSelector(selectFeedbackText);
	const originalText = useAppSelector(selectOriginalText);
	const aiRefinedText = useAppSelector(selectAIRefinedText);
	const isEnhancing = useAppSelector(selectIsEnhancing);
	const isValidLength = useAppSelector(selectIsValidLength);
	const isSubmitting = useAppSelector(selectIsSubmitting);
	const shopItem = useAppSelector(selectShopItem);
	const shopState = useAppSelector(selectShopState);
	const router = useRouter();

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(setOriginalText(e.target.value));
	};

	const handleEnhance = () => {
		// console.log(isValidLength, isSubmitting);
		if (isValidLength && !isEnhancing) {
			// dispatch(setIsEnhancing (true));
			dispatch(enhanceFeedback(originalText ?? "The service was excellent"));
			// dispatch(setIsEnhancing(false));
		}
	};
	const handleSubmit = async () => {
		// console.log(feedback);
		console.log(shopState);
		sessionStorage.setItem("feedback", JSON.stringify(feedback));
		sessionStorage.setItem("shop", JSON.stringify(shopState));
		console.log('[SUBMITTED] Feedback Text');
		router.push(`/shop/${slug}/save`);
	};


	return (
		<Card className="w-full max-w-sm mx-auto" style={
			{
				backgroundColor: 'lab(7.78201% -0.0000149012 0)'

			}
		}
		>
			<CardHeader className="text-left pb-4">
				<CardTitle className="text-xl font-semibold text-white">
					What did you love about us?
				</CardTitle>
			</CardHeader>

			<CardContent className="space-y-6">

				<Textarea
					id="feedback"
					placeholder="Tell us what you loved about our service..."
					value={originalText}
					onChange={handleChange}
					className={`min-h-[180px] resize-none transition-all duration-200 ${isEnhancing ? 'blur-sm opacity-50' : ''
						}`}
					disabled={isEnhancing}
				/>
				<div className="text-sm text-red-400">
					{isValidLength
						? ""
						: `${originalText?.length}/30 characters minimum`
					}
				</div>


				<Button
					type="button"
					variant="outline"
					onClick={handleEnhance}
					disabled={!isValidLength || isEnhancing}
					className="w-full transition-all duration-200 hover:scale-105 active:scale-95"
				>
					{isEnhancing ? 'Loading...' : 'Enhance your review'}
				</Button>

				<Button
					type="submit"
					disabled={!isValidLength || isSubmitting || isEnhancing}
					onClick={handleSubmit}
					className="w-full font-medium py-3 transition-all duration-200 hover:scale-105 active:scale-95"
				>
					{isSubmitting ? 'Submitting...' : 'Submit'}
				</Button>

			</CardContent>
		</Card>
	);
}