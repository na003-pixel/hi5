'use client';

import { use, useEffect, useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { fetchShop } from '@/store/shop/slice';
import { CustomerFeedbackRatingFormV2 } from '@/components/CustomerFeedbackRatingFormV2';
import { ShopPageProps } from '@/types/props/ShopPageProps';
import ShopHeaderV2 from '@/components/ShopHeaderV2';
import { ImageHeader, ImageHeaderV2 } from '@/components/ImageHeader';

// Unused imports from original code - can be removed
// import ShopHeader from '@/components/ShopHeader';
// import { Link } from 'lucide-react';
// import ShopHeaderV5 from '@/components/ShopHeaderV5';

export default function ShopLandingPage({ params }: ShopPageProps) {
	const dispatch = useAppDispatch();
	const resolvedParams = use(params);
	const aspectRatio = 1.5;
	const scaleFactor = 950;
	const slug = resolvedParams.slug;
	let imgsize = {
		width: (scaleFactor * aspectRatio),
		height: (scaleFactor)
	}

	// State for hydration-safe dimensions
	const [mounted, setMounted] = useState(false);
	const [dimensions, setDimensions] = useState({
		width: 1200,  // Safe fallback for SSR
		height: 675   // 16:9 aspect ratio
	});

	// SSR-safe dimension calculation
	const calculateOptimalSize = (viewportWidth: number, viewportHeight: number) => {
		const usableWidth = (viewportWidth * 0.6) - 64;
		const usableHeight = viewportHeight - 200;
		const aspectRatio = 16 / 9;

		let width = usableWidth;
		let height = width / aspectRatio;

		if (height > usableHeight) {
			height = usableHeight;
			width = height * aspectRatio;
		}

		return {
			width: Math.floor(Math.max(width, 800)),  // Minimum width
			height: Math.floor(Math.max(height, 450)) // Minimum height
		};
	};

	// Handle client-side mounting and resize
	useEffect(() => {
		setMounted(true);

		const updateDimensions = () => {
			setDimensions(calculateOptimalSize(window.innerWidth, window.innerHeight));
		};

		updateDimensions();
		window.addEventListener('resize', updateDimensions);

		return () => window.removeEventListener('resize', updateDimensions);
	}, []);

	// Use fallback dimensions during SSR, actual dimensions after hydration
	imgsize = mounted ? dimensions : { width: 1200, height: 675 };

	// imgsize = getOptimalImageSize();



	// useEffect(() => {
	// 	if (slug) {
	// 		dispatch(fetchShop(slug));
	// 	}
	// }, [dispatch, slug]);

	return (
		// Main container for the two-pane layout
		// - Stacks vertically on mobile (grid-cols-1)
		// - Becomes a 3-column grid on medium screens and up (md:grid-cols-3)
		// - Adds padding and a gap between panes
		<div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-4 md:p-8 min-h-screen">
			{/* LEFT PANE: Takes 1 of 3 columns on medium screens and up */}
			<div className="md:col-span-1 flex flex-col gap-8">
				<ShopHeaderV2 />
				<CustomerFeedbackRatingFormV2 slug={slug} />
			</div>

			{/* RIGHT PANE: Takes 2 of 3 columns on medium screens and up */}
			<div className="md:col-span-2">
				<ImageHeaderV2 fill={true} />
			</div>
		</div>
	);
}