// eslint.config.js

import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Mimic __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});


const eslintConfig = [
	{
		ignores: [
			// "archive/**",
			"node_modules/**",
			".next/**",
			"out/**",
			"build/**",
			"next-env.d.ts",
		],
	},
	...compat.extends("next/core-web-vitals", "next/typescript"),


	...compat.config({
		extends: [
			// This is the recommended base extension for Next.js projects
			'next/core-web-vitals',
		],
		rules: {
			// --- Rules to Disable ---

			// Disables warnings about unused variables and imports.
			// Rule ID: @typescript-eslint/no-unused-vars
			'@typescript-eslint/no-unused-vars': 'off',

			// Disables errors when using the `any` type.
			// Rule ID: @typescript-eslint/no-explicit-any
			'@typescript-eslint/no-explicit-any': 'off',

			// Disables warnings about missing dependencies in React hooks (like useEffect).
			// Rule ID: react-hooks/exhaustive-deps
			'react-hooks/exhaustive-deps': 'off',

			// Disables errors for variables that could be declared with `const` instead of `let`.
			// Rule ID: prefer-const
			'prefer-const': 'off',
		},
	}),
];

export default eslintConfig;
