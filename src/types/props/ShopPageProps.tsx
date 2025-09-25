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