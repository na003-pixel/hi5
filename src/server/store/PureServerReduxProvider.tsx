import { Provider } from "react-redux";
import { makeServerStore, ServerAppStore, ServerRootState } from "./serverStore";

interface PureServerReduxProviderProps {
    children: React.ReactNode;
    preloadedState?: ServerRootState;
    store?: ServerAppStore;
}

export function PureServerReduxProvider({ children, preloadedState, store }: PureServerReduxProviderProps) {
    // Create store if not provided - this stays on server only
    const serverStore = store || makeServerStore(preloadedState);
    
    // Pure server-side - just return children, store exists in server context
    return <>{children}</>;
}