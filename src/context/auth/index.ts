import { createContext, useContext } from 'react';
import { AuthContextType } from './types';

export const AuthContext = createContext<AuthContextType>({
	user: {
		username: '',
		email: '',
	},
	isLogIn: false,
	refetch: () => {},
});

export const useAuthData = () => useContext(AuthContext);
