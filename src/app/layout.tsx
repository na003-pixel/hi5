import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";
import { StoreProvider } from "@/store/StoreProvider";


export const metadata: Metadata = {
	title: "Hi5 v0",
	description: "Platform for businesses to get reviews",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {


	return (
		<ClerkProvider>

			<html lang="en">
				<body
					className=""
					// className="dark"
				>
					{children}
				</body>
			</html>
		</ClerkProvider>

	);
}
