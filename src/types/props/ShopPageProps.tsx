import React from "react";

export interface ShopPageProps {
    params: Promise<{
        slug: string;
    }>;
}

export interface ShopLayoutProps {
	children: React.ReactNode;
	params: {
		slug: string;
	};
}




export interface ShopLayoutPropsV2 {
	children: React.ReactNode;
	params: {
		slug: string;
	}
}