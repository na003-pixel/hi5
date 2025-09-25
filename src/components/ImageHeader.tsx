"use client";

import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../store/hooks';
import { selectShopItem, selectShopLoading, selectShopError } from '../store/shop/selectors';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils'; // Using `cn` for robust class name merging
import { Fullscreen } from 'lucide-react';



/**
 * Displays a header image for the current shop, handling loading and error states.
 * Styling is customized by generating Tailwind classes from the optional props.
 */
export function ImageHeader({
	marginTop = 8
}: {
	marginTop?: number;
}) {
	// --- Data Logic ---
	const shop = useAppSelector(selectShopItem);
	const loading = useAppSelector(selectShopLoading);
	const error = useAppSelector(selectShopError);

	// --- Class Name Composition ---
	const containerClasses = cn(
		'relative overflow-hidden rounded-xl w-96 h-64', // Fill width, fixed reasonable height
		`mt-${marginTop}`
	);

	// --- View Definitions ---
	const loadingView = (
		<div className={cn(containerClasses, 'animate-pulse bg-gray-200 dark:bg-gray-700')} />
	);

	const errorView = (
		<div className={cn(
			containerClasses,
			'flex items-center justify-center bg-red-100 dark:bg-red-900/20 border border-dashed border-red-500'
		)}>
			<p className="text-red-600 dark:text-red-400 font-medium text-center px-4">
				Error: {error}
			</p>
		</div>
	);

	const imageView = (
		<Card className={containerClasses}>
			<CardContent className="p-0 relative w-full h-full">
				<Image
					src={shop?.Website || '/placeholder.jpg'}
					alt={shop?.name ? `Header for ${shop.name}` : 'Shop header'}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					priority
					className="object-cover"
				/>
			</CardContent>
		</Card>
	);

	const noShopView = (
		<div className={cn(
			containerClasses,
			'flex items-center justify-center bg-gray-100 dark:bg-gray-800 border border-dashed'
		)}>
			<p className="text-gray-500 dark:text-gray-400">Shop not found</p>
		</div>
	);

	// --- View Selection ---
	if (loading) return loadingView;
	if (error) return errorView;
	if (shop?.Id) return imageView;
	return noShopView;
}







/**
 * Displays a header image for the current shop, handling loading and error states.
 * Styling is customized by generating Tailwind classes from the optional props.
 */
export function ImageHeaderV2({
	size,
	maxWidth = 'max-w-2xl',
	marginTop = 0,
	fill = false
}: ImageHeaderProps) {
	// --- Data Logic ---
	const shop = useAppSelector(selectShopItem);
	const loading = useAppSelector(selectShopLoading);
	const error = useAppSelector(selectShopError);
	let defaultSize = undefined;

	if (!size && fill) {
		defaultSize = undefined; // No container constraints - inherit parent size
		size = {
			width: 120,  // Dummy values, not used
			height: 80
		}
	}
	else if (!size && !fill) {
		defaultSize = 'w-120 h-80'; // Default container size
		size = {
			width: 120,
			height: 80
		}
	}
	else {
		defaultSize = `w-[${size?.width}px] h-[${size?.height}px]`; // Use provided size
	}

	// --- Class Name Composition ---
	// For fill images, use aspect-ratio to constrain proportions within grid
	const containerClasses = cn(
		'relative overflow-hidden mx-auto', // mx-auto for centering
		`mt-${marginTop}`,
		fill && !defaultSize ? 'w-full aspect-[3/2]' : `${maxWidth} ${defaultSize}`
	);

	// --- View Definitions ---
	const loadingView = (
		<div
			className={cn(
				containerClasses,
				'animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg'
			)}
		/>
	);

	const errorView = (
		<div
			className={cn(
				containerClasses,
				'flex items-center justify-center bg-red-100 dark:bg-red-900/20 rounded-lg border border-dashed border-red-500'
			)}
		>
			<p className="text-red-600 dark:text-red-400 font-medium text-center px-4">
				Error: {error}
			</p>
		</div>
	);

	const imageView = (
		<Card className={containerClasses}>
			<CardContent className="p-0 h-full w-full">
				<Image
					src={shop?.Website || '/placeholder.jpg'}
					alt={shop?.name ? `Header for ${shop.name}` : 'Shop header'}
					width={(size && !fill) ? size.width : undefined}
					height={(size && !fill) ? size.height : undefined}
					fill={fill}
					sizes={fill ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : undefined}
					priority
					className="object-cover"
				/>
			</CardContent>
		</Card>
	);

	const noShopView = (
		<div
			className={cn(
				containerClasses,
				'flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg border border-dashed'
			)}
		>
			<p className="text-gray-500 dark:text-gray-400">Shop not found</p>
		</div>
	);

	// --- View Selection ---
	const selectView = () => {
		if (loading) return loadingView;
		if (error) return errorView;
		if (shop?.Id) return imageView;
		return noShopView;
	};

	return selectView();
}