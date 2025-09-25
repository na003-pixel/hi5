import { RootState } from '@/store/index';
import { UserInterface } from '@/types/primitives/User';
import { UserStateInterface } from '@/types/states/States';




// Base selector - returns the entire user slice state
export const selectUserState = (state: RootState): UserStateInterface => {
    return state.user;
};


// User object selector - returns the entire user object as-is
export const selectUser = (state: RootState): UserInterface => {
    return state.user.user;
};




// Individual user property selectors
export const selectIsSignedIn = (state: RootState): boolean => {
    return state.user.user.isSignedIn;
};


export const selectUserToken = (state: RootState): string | null => {
    return state.user.user.token;
};


export const selectUserId = (state: RootState): string | null => {
    return state.user.user.userId;
};


export const selectUserName = (state: RootState): string => {
    return state.user.user.name;
};


export const selectUserEmail = (state: RootState): string => {
    return state.user.user.email;
};


export const selectUserPhone = (state: RootState): number | null => {
    return state.user.user.phone;
};


export const selectUserCreatedAt = (state: RootState): string | null => {
    return state.user.user.createdAt;
};




// UI state selectors
export const selectUserLoading = (state: RootState): boolean => {
    return state.user.loading;
};


export const selectUserError = (state: RootState): string | null => {
    return state.user.error;
};




// Computed/derived selectors
export const selectHasUserError = (state: RootState): boolean => {
    return state.user.error !== null;
};


export const selectIsUserLoading = (state: RootState): boolean => {
    return state.user.loading;
};


export const selectUserDisplayName = (state: RootState): string => {
    const user = state.user.user;
    return user.name || user.email || 'User';
};


export const selectUserInitials = (state: RootState): string => {
    const name = state.user.user.name;
    
    if (!name) {
        return '';
    }
    
    return name
        .split(' ')
        .map(part => part.charAt(0).toUpperCase())
        .join('')
        .slice(0, 2);
};


export const selectIsAuthenticated = (state: RootState): boolean => {
    const user = state.user.user;
    return user.isSignedIn && user.userId !== null;
};


export const selectUserProfile = (state: RootState) => {
    const user = state.user.user;
    
    return {
        name: user.name,
        email: user.email,
        phone: user.phone,
        createdAt: user.createdAt,
    };
};


export const selectUserContactInfo = (state: RootState) => {
    const user = state.user.user;
    
    return {
        email: user.email,
        phone: user.phone,
    };
};