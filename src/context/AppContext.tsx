import { ReactNode } from 'react';
import { UserProvider } from './UserContext';

type IAppContextType = {
	children: ReactNode;
};

export const AppContextProvider = ({ children }: IAppContextType) => {
	return <UserProvider>{children}</UserProvider>;
};
