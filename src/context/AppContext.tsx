import { ReactNode } from 'react';
import { UserProvider } from './UserContext';

type AppContextType = {
	children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextType) => {
	return <UserProvider>{children}</UserProvider>;
};
