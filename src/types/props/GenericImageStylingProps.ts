import { AspectRatioConfig, DisplaySizeConfig, ImageSizeConfig } from "../styling/Images";
import { SpacingConfig } from "../styling/Spacing";

export interface ImageStylingProps {
	// Core sizing strategies (mutually exclusive)
	displaySize?: DisplaySizeConfig;  // How big the component appears
	imageSize?: ImageSizeConfig;      // Intrinsic image dimensions for Next.js
	fill?: boolean;

	// Spacing configuration
	margin?: SpacingConfig;
	padding?: SpacingConfig;

	// Aspect ratio control
	aspectRatio?: AspectRatioConfig;

	// Layout constraints
	maxWidth?: string;

	// Visual styling
	rounded?: boolean | 'sm' | 'md' | 'lg' | 'xl' | 'full';

	// Image overrides
	src?: string;
	alt?: string;
	priority?: boolean;

	// Additional styling
	className?: string;
}