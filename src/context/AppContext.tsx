import { ReactNode } from 'react';
import { UserProvider } from './UserContext';

interface IAppContextProvider {
	children: ReactNode;
}

export const AppContextProvider = ({ children }: IAppContextProvider) => {
	return <UserProvider>{children}</UserProvider>;
};
