// store/serverStore.ts
'use client'
import { ReactNode, useRef } from 'react'
import { Provider } from 'react-redux'
import { ServerAppStore, ServerRootState, makeServerStore } from './serverStore'

interface HybridReduxProviderProps {
	children: ReactNode;
	preloadedState: ServerRootState;
}

export default function HybridReduxProvider({
	children,
	preloadedState,
}: HybridReduxProviderProps) {
	const storeRef = useRef<ServerAppStore | null>(null);

	if (!storeRef.current) {
		storeRef.current = makeServerStore(preloadedState);
	}

	return (<Provider store={ storeRef.current }> { children } </Provider>);
}