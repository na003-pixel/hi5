'use client';

import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../store/hooks';
import { selectShopItem, selectShopLoading, selectShopError } from '../store/shop/selectors';
import { Card, CardContent } from './ui/card';
import { cn } from '@/lib/utils';
import { buildMarginStyles, buildPaddingStyles } from '@/utils/CSSSpacingGenerator';
import { AspectRatioConfig, DisplaySizeConfig, ImageSizeConfig } from '@/types/styling/Images';
import { ImageStylingProps } from '@/types/props/GenericImageStylingProps';






function buildRoundingClasses(rounded: ImageStylingProps['rounded']): string {
	if (!rounded) return '';
	if (rounded === true) return 'rounded-lg';
	if (rounded === 'full') return 'rounded-full';
	return `rounded-${rounded}`;
}

function buildAspectRatioClasses(aspectRatio: AspectRatioConfig | undefined): string {
	if (!aspectRatio) return '';
	return `aspect-[${aspectRatio.width}/${aspectRatio.height}]`;
}

// --- Main Component ---
export function GenericImageHeader({
	displaySize,
	imageSize,
	fill = false,
	heightFillStrategy = "screen",
	margin,
	padding,
	aspectRatio,
	maxWidth = 'max-w-2xl',
	rounded = 'lg',
	src,
	alt,
	priority = false,
	className,
	divStyles,
	elemStyles,
}: ImageStylingProps) {
	// --- Data Logic ---
	const shop = useAppSelector(selectShopItem);
	const loading = useAppSelector(selectShopLoading);
	const error = useAppSelector(selectShopError);

	// --- Sizing Strategy Logic ---
	const getSizingStrategy = () => {
		if (fill) {
			let needsMinHeightVar = false;

			if (!aspectRatio) {
				if (heightFillStrategy === "h-screen" || (heightFillStrategy === "h-full")) {
					needsMinHeightVar = true;
				}
				else {
					needsMinHeightVar = false;
				}
			}
			return {
				containerSizing: `w-full ${heightFillStrategy}`.trim(),
				imageStrategy: 'fill',
				needsMinHeight: needsMinHeightVar
			};
		}

		if (displaySize) {
			const widthClass = `w-[${displaySize.width}px]`;
			const heightClass = aspectRatio ? '' : `h-[${displaySize.height}px]`;
			return {
				containerSizing: `${widthClass} ${heightClass}`.trim(),
				imageStrategy: 'fixed',
				needsMinHeight: false
			};
		}

		// Default: small image with aspect ratio
		return {
			containerSizing: 'w-32 h-32',
			imageStrategy: 'fixed',
			needsMinHeight: false
		};
	};

	const sizingStrategy = getSizingStrategy();

	// --- Class Name Composition ---
	const buildContainerClasses = () => {
		const baseClasses = [
			'relative overflow-hidden',
			sizingStrategy.containerSizing,
			buildRoundingClasses(rounded),
		];

		if (aspectRatio) {
			baseClasses.push(buildAspectRatioClasses(aspectRatio));
		}

		// Add constraints for non-fill scenarios
		if (!fill) {
			baseClasses.push('mx-auto', maxWidth);
		}

		// Add minimum height for fill scenarios
		if (sizingStrategy.needsMinHeight) {
			baseClasses.push('min-h-[300px]');
		}

		return cn(...baseClasses, className);
	};

	const buildContentClasses = () => {
		return cn(
			'relative w-full h-full',  // Content always fills container
		);
	};


	const containerClasses = buildContainerClasses();
	const contentClasses = buildContentClasses();

	const containerStyles = buildMarginStyles(margin);
	const contentStyles = buildPaddingStyles(padding);


	const completeDivStyles = {
		...containerStyles,
		...divStyles,
	}

	const completeElemStyles = {
		...contentStyles,
		...elemStyles,
	}

	// console.log(containerClasses);



	// --- Image Configuration ---
	const getImageConfig = () => {
		const imageSrc = src || shop?.Website || '/placeholder.jpg';
		const imageAlt = alt || (shop?.name ? `Header for ${shop.name}` : 'Shop header');

		const config: any = {
			src: imageSrc,
			alt: imageAlt,
			priority,
			className: 'object-cover'
		};

		if (sizingStrategy.imageStrategy === 'fill') {
			config.fill = true;
			config.sizes = fill
				? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
				: undefined;
		}

		else {
			// Use provided imageSize, or fall back to displaySize, or defaults
			const effectiveImageSize = imageSize || displaySize || {
				width: 128,
				height: 128,
			};
			config.width = effectiveImageSize.width;
			config.height = effectiveImageSize.height;
		}

		return config;
	};

	const imageConfig = getImageConfig();

	// --- View Definitions ---
	const loadingView = (
		<div className={cn(
			containerClasses,
			'animate-pulse bg-gray-200 dark:bg-gray-700'
		)} />
	);

	const errorView = (
		<div className={cn(
			containerClasses,
			'flex items-center justify-center',
			'bg-red-100 dark:bg-red-900/20',
			'border border-dashed border-red-500'
		)}>
			<p className="text-red-600 dark:text-red-400 font-medium text-center px-4">
				Error: {error}
			</p>
		</div>
	);

	const imageView = (
		<Card
			className={containerClasses}
			style={completeDivStyles}
		>
			<CardContent
				className={contentClasses}
				style={completeElemStyles}
			>
				<Image {...imageConfig} />
			</CardContent>
		</Card>
	);

	const noShopView = (
		<div className={cn(
			containerClasses,
			'flex items-center justify-center',
			'bg-gray-100 dark:bg-gray-800',
			'border border-dashed border-gray-400'
		)}>
			<p className="text-gray-500 dark:text-gray-400">
				Shop not found
			</p>
		</div>
	);

	// --- View Selection ---
	const selectView = () => {
		if (loading) return loadingView;
		if (error) return errorView;
		if (shop?.Id || src) return imageView;
		return noShopView;
	};

	return selectView();
}

// --- Usage Examples ---

/*
// Basic usage with defaults (32x32 display)
<ImageHeader />

// Fixed display size with separate image optimization
<ImageHeader 
  displaySize={{ width: 400, height: 300 }}
  imageSize={{ width: 1200, height: 900 }}  // High-res source for Next.js optimization
/>

// Fill container with aspect ratio
<ImageHeader 
  fill={true} 
  aspectRatio={{ width: 16, height: 9 }}
  margin={{ y: 4 }}
/>

// Custom styling and spacing
<ImageHeader 
  displaySize={{ width: 300, height: 200 }}
  imageSize={{ width: 1800, height: 1200 }}
  padding={{ x: 4, y: 2 }}
  margin={{ top: 8, bottom: 4 }}
  rounded="xl"
  maxWidth="max-w-lg"
/>

// Split screen usage
<ImageHeader 
  fill={true}
  aspectRatio={{ width: 3, height: 2 }}
  rounded="lg"
/>
*/