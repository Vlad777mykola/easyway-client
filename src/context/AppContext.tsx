import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { ScreenSizeProvider } from './ScreenSizeContext';

type AppContextType = {
	children: ReactNode;
};

export const AppContextProvider = ({ children }: AppContextType) => {
	return (
		<UserProvider>
			<ScreenSizeProvider>{children}</ScreenSizeProvider>
		</UserProvider>
	);
};
