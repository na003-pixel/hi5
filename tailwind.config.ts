import type { Config } from 'tailwindcss';


export default {
	darkMode: "class",
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				'steel-gray': {
					50:  'hsl(var(--steel-gray-50))',
					100: 'hsl(var(--steel-gray-100))',
					200: 'hsl(var(--steel-gray-200))',
					300: 'hsl(var(--steel-gray-300))',
					400: 'hsl(var(--steel-gray-400))',
					500: 'hsl(var(--steel-gray-500))',
					600: 'hsl(var(--steel-gray-600))',
					700: 'hsl(var(--steel-gray-700))',
					800: 'hsl(var(--steel-gray-800))',
					900: 'hsl(var(--steel-gray-900))',
				},
				"blue": {
					500: "#FF0080",
				}
			},
		},
	},
} satisfies Config;

