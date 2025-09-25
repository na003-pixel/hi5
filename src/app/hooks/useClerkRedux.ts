"use client";

import { useEffect } from 'react';
import { useUser } from '@clerk/nextjs';
import { useAppDispatch } from '@/store/hooks';
import { syncUser, setUserLoading } from '@/store/user/slicev2';

/**
 * A hook that listens to Clerk's useUser hook and dispatches
 * the user data to the Redux store whenever it changes.
 * Returns the Clerk loading state for components to use as a gate.
 */
export function useClerkRedux() {
	const { isLoaded, isSignedIn, user } = useUser();
	const dispatch = useAppDispatch();

	useEffect(() => {
		// Immediately update Redux loading state based on Clerk's loading state.
		dispatch(setUserLoading(!isLoaded));

		if (isLoaded) {
			// Once loaded, sync the user object.
			dispatch(syncUser({
				isSignedIn: isSignedIn,
				userId: user?.id || null,
				name: user?.fullName || "",
				email: user?.primaryEmailAddress?.emailAddress || "",
				phone: user?.primaryPhoneNumber ? parseInt(user.primaryPhoneNumber.phoneNumber) : null,
				createdAt: user?.createdAt ? new Date(user.createdAt).toISOString() : null,
			}));
		}
	}, [isLoaded, isSignedIn, user, dispatch]);

	return { isClerkLoaded: isLoaded };
}