import { ReactNode } from 'react';
import { UserProvider } from './UserContext';
import { ScreenSizeProvider } from './ScreenSizeContext';

export const AppProvider = ({ children }: { children: ReactNode }): ReactNode => {
	return (
		<UserProvider>
			<ScreenSizeProvider>{children}</ScreenSizeProvider>
		</UserProvider>
	);
};
