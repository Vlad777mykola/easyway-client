import { ReactNode } from 'react';

export type UserData = {
	username: string;
	email: string;
};

export type AuthContextType = {
	user: UserData;
	isLogIn: boolean;
	refetch: () => void;
};

export type UserProvider = {
	children: ReactNode;
};
