import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../store/hooks';
import { selectShopItem, selectShopLoading, selectShopError } from '../store/shop/selectors';


export default function ShopHeaderV2() {
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

		if (shop?.Name) {
			return shop.Name;
		}

		return "Shop Not Found";
	};

	// Rule #3: Encapsulation Mandate - component-specific handlers
	const getHeaderSubtitle = () => {

		if (loading) {
			return "Loading...";
		}

		if (error) {
			return `Error: ${error}`;
		}

		if (shop?.Name) {
			return shop.OwnerName;
		}

		return "Shop Not Found";
	};


	// Rule #1: Active Composition - compose view from logical parts
	const headerText = getHeaderContent();
	const headerSubtitle = getHeaderSubtitle();

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

	const shopNameView = (
		<>
			<h1 className="text-4xl font-bold tracking-tight text-center">
				{headerText}
			</h1>
			{/* <p className="font-semibold text-xl">
				{headerSubtitle}
			</p> */}
		</>
	);

	const emptyView = (
		<h1 className="text-4xl font-bold tracking-tight text-gray-500 text-center py-8">
			{headerText}
		</h1>
	);

	// Determine which view to show
	const getView = () => {

		if (loading) {
			return loadingView;
		}

		if (error) {
			return errorView;
		}

		if (shop?.Name) {
			return shopNameView;
		}

		return emptyView;
	};

	const shopHeaderView = getView();

	// Rule #1: Return single composed view
	return shopHeaderView;
}