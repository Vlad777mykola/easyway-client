import { useUser } from '@/shared/api-hooks/useUser';
import { createContext, ReactNode, useContext } from 'react';

type UserData = {
	username: string;
	email: string;
};

type TAuthContext = {
	user: UserData;
	isLogIn: false;
	refetch: () => void;
};

type TUserProvider = {
	children: ReactNode;
};

const AuthContext = createContext<TAuthContext>({
	user: {
		username: '',
		email: '',
	},
	isLogIn: false,
	refetch: () => {},
});

export const AuthProvider = ({ children }: TUserProvider) => {
	const { data: user, refetch } = useUser();

	return (
		<AuthContext.Provider value={{ user, isLogIn: user?.id, refetch }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuthData = () => useContext(AuthContext);
