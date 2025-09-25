"use client";

import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectShopItem, selectShopLoading, selectShopError } from '../store/shop/selectors';
import Image from 'next/image';
import { Card, CardContent } from './ui/card';


export default function ShopImageHeader() {
	// Rule #5: Logic-View Decoupling - consume hook state
	const shop = useAppSelector(selectShopItem);
	const loading = useAppSelector(selectShopLoading);
	const error = useAppSelector(selectShopError);



	// Rule #3: Encapsulation Mandate - component-specific handlers
	const getHeaderContent = () => {

		if (loading) {
			return "Loading...";
		}

		if (error) {
			return `Error: ${error}`;
		}

		if (shop?.Id) {
			return shop.Id;
		}

		return "Shop Not Found";
	};

	// Rule #1: Active Composition - compose view from logical parts
	const headerText = getHeaderContent();


	const loadingView = (
		<div className="text-4xl font-bold tracking-tight text-center py-8 animate-pulse">
			<div className="h-8 bg-gray-300 rounded w-48 mx-auto"></div>
		</div>
	);

	const errorView = (
		<h1 className="text-4xl font-bold tracking-tight text-red-500 text-center py-8">
			{headerText}
		</h1>
	);


	const imageView = (
		<div className="flex justify-center mt-8 md:mt-12 px-4">

			{/* The Card component acts as the main container for the image */}
			<Card className="relative w-120 max-w-2xl h-80 overflow-hidden"> {/* max-w- can be adjusted (lg, xl, etc.) */}
				<CardContent className="p-0"> {/* p-0 removes the default padding so the image is flush */}
					<Image
						src="https://owcpqjfhmhfkfvptqvwd.supabase.co/storage/v1/object/public/hi5-images/header-images/beach.jpg"
						// Use the image's true aspect ratio to prevent layout shift
						// width={1005}
						// height={670}
						sizes="(max-width: 768px) 100vw, 50vw"
						alt="A beautiful sunny beach with waves"
						// Let the image fill its container width, height adjusts automatically
						className="w-full h-auto"
						// Make image a high priority to load, as it's likely "above the fold"
						priority
						fill
					/>
				</CardContent>
			</Card>
		</div>
	);


	// Determine which view to show
	const getView = () => {

		if (loading) {
			return loadingView;
		}

		if (error) {
			return errorView;
		}

		if (shop?.Id) {
			return imageView;
		}

		return loadingView;
	};

	const getImageView = getView();

	// Rule #1: Return single composed view
	return getImageView;
}