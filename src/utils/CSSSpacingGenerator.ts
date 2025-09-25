// --- CSS Spacing Generators ---

import { SpacingConfig } from "@/types/styling/Spacing";



/**
 * Converts Tailwind spacing units to rem values
 * Tailwind scale: 1 = 0.25rem, 4 = 1rem, 16 = 4rem, etc.
 */
function spacingToRem(spacing: number): string {
	return `${spacing * 0.25}rem`;
}

/**
 * Generates CSS margin properties from spacing config
 */
function buildMarginStyles(spacing: SpacingConfig | undefined): React.CSSProperties {
	if (!spacing) return {};

	const styles: React.CSSProperties = {};

	// Handle x/y shorthand first
	if (spacing.x !== undefined) {
		styles.marginLeft = spacingToRem(spacing.x);
		styles.marginRight = spacingToRem(spacing.x);
	}
	if (spacing.y !== undefined) {
		styles.marginTop = spacingToRem(spacing.y);
		styles.marginBottom = spacingToRem(spacing.y);
	}

	// Individual directions override x/y if specified
	if (spacing.top !== undefined) styles.marginTop = spacingToRem(spacing.top);
	if (spacing.bottom !== undefined) styles.marginBottom = spacingToRem(spacing.bottom);
	if (spacing.left !== undefined) styles.marginLeft = spacingToRem(spacing.left);
	if (spacing.right !== undefined) styles.marginRight = spacingToRem(spacing.right);

	return styles;
}

/**
 * Generates CSS padding properties from spacing config
 */
function buildPaddingStyles(spacing: SpacingConfig | undefined): React.CSSProperties {
	if (!spacing) return {};

	const styles: React.CSSProperties = {};

	// Handle x/y shorthand first
	if (spacing.x !== undefined) {
		styles.paddingLeft = spacingToRem(spacing.x);
		styles.paddingRight = spacingToRem(spacing.x);
	}
	if (spacing.y !== undefined) {
		styles.paddingTop = spacingToRem(spacing.y);
		styles.paddingBottom = spacingToRem(spacing.y);
	}

	// Individual directions override x/y if specified
	if (spacing.top !== undefined) styles.paddingTop = spacingToRem(spacing.top);
	if (spacing.bottom !== undefined) styles.paddingBottom = spacingToRem(spacing.bottom);
	if (spacing.left !== undefined) styles.paddingLeft = spacingToRem(spacing.left);
	if (spacing.right !== undefined) styles.paddingRight = spacingToRem(spacing.right);

	return styles;
}

/**
 * Combines margin and padding styles into a single style object
 */
function buildSpacingStyles(
	margin: SpacingConfig | undefined,
	padding: SpacingConfig | undefined
): React.CSSProperties {
	return {
		...buildMarginStyles(margin),
		...buildPaddingStyles(padding)
	};
}

export {
	buildMarginStyles,
	buildPaddingStyles,
	buildSpacingStyles,
	spacingToRem
};