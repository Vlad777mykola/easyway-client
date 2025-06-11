/* eslint-disable react-refresh/only-export-components */
import { useUser } from '@/shared/api-hooks/useUser';
import { createContext, ReactNode, useContext } from 'react';

type UserData = {
	username: string;
	email: string;
};

type AuthContextType = {
	user: UserData;
	isLogIn: boolean;
	refetch: () => void;
};

type UserProvider = {
	children: ReactNode;
};

const AuthContext = createContext<AuthContextType>({
	user: {
		username: '',
		email: '',
	},
	isLogIn: false,
	refetch: () => {},
});

export const AuthProvider = ({ children }: UserProvider) => {
	const { data: user, refetch } = useUser();

	return (
		<AuthContext.Provider value={{ user, isLogIn: !!user?.id, refetch }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthData = () => useContext(AuthContext);
