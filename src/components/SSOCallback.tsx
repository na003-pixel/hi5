"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";

/**
 * This component's sole purpose is to handle the post-OAuth redirect.
 * It waits for Clerk to finalize the session and then navigates to the
 * actual destination (/save).
 */
export default function SSOCallback() {
	const { isLoaded, isSignedIn } = useUser();
	const router = useRouter();
	const params = useParams();
	const slug = params.slug as string;
	const clerk = useClerk();

	// Log the Clerk instance ID when this component mounts
	useEffect(() => {
		if (clerk && (window as any).Clerk) {
			console.log(`SSOCallback MOUNTED. Clerk Instance ID: ${(window as any).Clerk.id}`);
		}
	}, [clerk]);

	useEffect(() => {
		// Wait until Clerk has loaded its state.
		if (!isLoaded) {
			return;
		}

		// Once loaded, we can check the sign-in status.
		if (isSignedIn) {
			// SUCCESS: The user is now signed in. Redirect to the save page.
			console.log("SSO Callback: User is signed in. Redirecting to /save...");
			router.push(`/shop/${slug}/save`);
		} else {
			// FAILURE/TIMEOUT: The user is still not signed in.
			// This could be an error or the user cancelled. Redirect to sign-in.
			console.error("SSO Callback: User is not signed in after callback. Redirecting to sign-in...");
			router.push(`/shop/${slug}/sign-in`);
		}
	}, [isLoaded, isSignedIn, router, slug]);

	// Render a simple loading state while Clerk is finalizing the session.
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center">
				<h1 className="text-2xl font-semibold mb-4">Verifying your identity...</h1>
				<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
			</div>
		</div>
	);
}