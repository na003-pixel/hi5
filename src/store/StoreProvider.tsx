'use client';

import { Provider } from 'react-redux';
import { AppStore, makeStore } from './index';
import React, { useRef } from 'react';

export function StoreProvider({
	children,
	// preloadedState: Partial <RootState>
}: {
	children: React.ReactNode
}) {
	const storeRef = useRef<AppStore | null>(null);
	if (!storeRef.current) {
		// Create the store instance the first time this renders
		storeRef.current = makeStore()
	}

	// console.log(JSON.stringify(storeRef.current));

	return <Provider store={storeRef.current}>{children}</Provider>
}
