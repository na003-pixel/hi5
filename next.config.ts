import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	// Method 1: Exclude from webpack bundling (most comprehensive)
	// webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
	// 	// Ignore all files in /archive directory during bundling
	// 	config.plugins.push(
	// 		new webpack.IgnorePlugin({
	// 			resourceRegExp: /^\.\/archive/,
	// 			contextRegExp: /$/,
	// 		})
	// 	);

	// 	// Also exclude from module resolution
	// 	config.module.rules.push({
	// 		test: /archive\//,
	// 		use: 'ignore-loader'
	// 	});

	// 	return config;
	// },
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'owcpqjfhmhfkfvptqvwd.supabase.co',
				pathname: '/storage/v1/**',
			},
		],
	},
	/* other config options here */
};

export default nextConfig;
