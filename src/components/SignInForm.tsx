// components/SignInForm.tsx
"use client";


import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store/index';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Mail, Lock, Chrome, Route } from 'lucide-react';
import { SignInCredentials } from '@/types/primitives/SignIn';
import { useRouter } from 'next/navigation';
import { selectFeedbackState } from '@/store/feedback/selectors';




import React, { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
// import { signInWithClerk, clearError, initiateGoogleSignIn } from '@/store/user/slicev2';
import { selectUserState } from '@/store/user/selectors';
import { useClerk, useSignIn } from '@clerk/nextjs';
import { selectShopItem } from '@/store/shop/selectors';




// export default function AuthForm() {
// 	const dispatch = useDispatch<AppDispatch>();
// 	const feedback = useAppSelector(selectFeedbackState);
// 	const { loading, error } = useSelector((state: RootState) => state.user);
// 	const router = useRouter();

// 	const [email, setEmail] = useState('');
// 	const [password, setPassword] = useState('');

// 	const handleEmailSignIn = async (e: React.FormEvent) => {
// 		e.preventDefault();
// 		if (!email || !password) return;

// 		const credentials: SignInCredentials = { email, password };
// 		try {
// 			await dispatch(signInWithClerk({ credentials, router })).unwrap();
// 		} catch (error) {
// 			console.error('Sign in failed:', error);
// 		}
// 	};

// 	const handleGoogleSignIn = async () => {
// 		try {
// 			await dispatch(signInWithGoogle({ router })).unwrap();
// 		} catch (error) {
// 			console.error('Google sign in failed:', error);
// 		}
// 	};

// 	const cardClick = () => {
// 		// console.log (feedback);
// 		return;
// 	}

// 	return (
// 		<Card className="w-full max-w-md" onClick={cardClick}>
// 			<CardHeader className="space-y-1">
// 				<CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
// 				<CardDescription className="text-center">
// 					Sign in to your account to continue
// 				</CardDescription>
// 			</CardHeader>
// 			<CardContent className="space-y-4">
// 				<Button
// 					onClick={handleGoogleSignIn}
// 					variant="outline"
// 					className="w-full"
// 					disabled={loading}
// 				>
// 					<Chrome className="mr-2 h-4 w-4" />
// 					Continue with Google
// 				</Button>

// 				<div className="relative">
// 					<div className="absolute inset-0 flex items-center">
// 						<span className="w-full border-t" />
// 					</div>
// 					<div className="relative flex justify-center text-xs uppercase">
// 						<span className="bg-background px-2 text-muted-foreground">
// 							Or continue with
// 						</span>
// 					</div>
// 				</div>

// 				<form onSubmit={handleEmailSignIn} className="space-y-4">
// 					<div className="space-y-2">
// 						<Label htmlFor="email">Email</Label>
// 						<div className="relative">
// 							<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// 							<Input
// 								id="email"
// 								type="email"
// 								placeholder="Enter your email"
// 								value={email}
// 								onChange={(e) => setEmail(e.target.value)}
// 								className="pl-10"
// 								required
// 							/>
// 						</div>
// 					</div>

// 					<div className="space-y-2">
// 						<Label htmlFor="password">Password</Label>
// 						<div className="relative">
// 							<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
// 							<Input
// 								id="password"
// 								type="password"
// 								placeholder="Enter your password"
// 								value={password}
// 								onChange={(e) => setPassword(e.target.value)}
// 								className="pl-10"
// 								required
// 							/>
// 						</div>
// 					</div>

// 					{error && (
// 						<div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
// 							{error}
// 						</div>
// 					)}

// 					<Button type="submit" className="w-full" disabled={loading}>
// 						{loading ? 'Signing in...' : 'Sign in'}
// 					</Button>
// 				</form>
// 			</CardContent>
// 		</Card>
// 	);
// }








export function AuthFormV2() {
	const { isLoaded, signIn, setActive } = useSignIn();
	const router = useRouter();
	const shopItem = useAppSelector(selectShopItem);
	const clerk = useClerk ();

	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const getRedirectPath = () => {
		return `/shop/${shopItem?.Id}/save`;
	};

	// --- THIS IS THE NEW CRITICAL FUNCTION ---
	const getRedirectPathForCallback = () => {
		// The URL Google redirects to. This page handles the async sign-in completion.
		return `/shop/${shopItem?.Id}/auth-redirect`;
	};


	// Log the Clerk instance ID when the component mounts
	useEffect(() => {
		if (clerk && (window as any).Clerk) {
			console.log(`SignInForm MOUNTED. Clerk Instance ID: ${(window as any).Clerk.id}`);
		}
	}, [clerk]);




	// Handle email/password sign in
	const handleEmailSignIn = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!isLoaded || !signIn) return;

		setError(null);
		setLoading(true);

		if (!email.trim() || !password.trim()) {
			setError('Email and password are required');
			setLoading(false);
			return;
		}

		try {
			const result = await signIn.create({
				identifier: email.trim(),
				password: password.trim(),
			});

			if (result.status === 'complete') {
				await setActive({ session: result.createdSessionId });
				console.log('Email sign in successful');
				// Redux will be automatically updated by ClerkReduxSync component
				router.push(getRedirectPathForCallback());
			} else {
				setError('Sign in incomplete. Please try again.');
			}
		} catch (err: any) {
			console.error('Sign in error:', err);
			const errorMessage = err.errors?.[0]?.message || 'Sign in failed';
			setError(errorMessage);
		} finally {
			setLoading(false);
		}
	};

	// Handle Google OAuth sign in
	const handleGoogleSignIn = async () => {
		if (!isLoaded || !signIn) return;

				// Log the ID at the exact moment of initiation
		if ((window as any).Clerk) {
			console.log(`Google Sign-In INITIATED. Clerk Instance ID: ${(window as any).Clerk.id}`);
		}

		setError(null);
		setLoading(true);

		try {
			const redirectUrl = `${getRedirectPathForCallback()}`;

			// This will redirect immediately - no need to handle return value
			await signIn.authenticateWithRedirect({
				strategy: 'oauth_google',
				redirectUrl: "/sso-callback",
				redirectUrlComplete: "/sso-callback",
			});
		} catch (err: any) {
			console.error('Google sign in error:', err);
			setError('Google sign in failed');
			setLoading(false);
		}
	};

	// Rule #1: Active Composition
	const googleButton = (
		<Button
			onClick={handleGoogleSignIn}
			variant="outline"
			className="w-full"
			disabled={!isLoaded || loading}
		>
			<Chrome className="mr-2 h-4 w-4" />
			{loading ? 'Signing in...' : 'Continue with Google'}
		</Button>
	);

	const divider = (
		<div className="relative">
			<div className="absolute inset-0 flex items-center">
				<span className="w-full border-t" />
			</div>
			<div className="relative flex justify-center text-xs uppercase">
				<span className="bg-background px-2 text-muted-foreground">
					Or continue with
				</span>
			</div>
		</div>
	);

	const emailForm = (
		<form onSubmit={handleEmailSignIn} className="space-y-4">
			<div className="space-y-2">
				<Label htmlFor="email">Email</Label>
				<div className="relative">
					<Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="email"
						type="email"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="pl-10"
						disabled={!isLoaded || loading}
					/>
				</div>
			</div>

			<div className="space-y-2">
				<Label htmlFor="password">Password</Label>
				<div className="relative">
					<Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
					<Input
						id="password"
						type="password"
						placeholder="Enter your password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className="pl-10"
						disabled={!isLoaded || loading}
					/>
				</div>
			</div>

			<Button
				type="submit"
				className="w-full"
				disabled={!isLoaded || loading}
			>
				{loading ? 'Signing in...' : 'Sign in'}
			</Button>
		</form>
	);

	const errorDisplay = error && (
		<div className="text-sm text-red-600 bg-red-50 dark:bg-red-950/20 p-3 rounded-md">
			{error}
		</div>
	);

	const loadingOverlay = !isLoaded && (
		<div className="absolute inset-0 bg-black/20 flex items-center justify-center rounded-lg">
			<div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
		</div>
	);

	const authFormView = (
		<Card className="w-full max-w-md relative">
			<CardHeader className="space-y-1">
				<CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
				<CardDescription className="text-center">
					Sign in to your account to continue
				</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				{googleButton}
				{divider}
				{emailForm}
				{errorDisplay}
			</CardContent>
			{loadingOverlay}
		</Card>
	);

	return authFormView;
}