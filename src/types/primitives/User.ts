export interface UserInterface {
	isSignedIn: boolean;
	token: string | null;
	userId: string | null;
	name: string;
	email: string;
	phone: number | null;
	createdAt: string | null;
}