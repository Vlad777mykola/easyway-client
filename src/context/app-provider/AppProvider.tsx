import { ReactNode } from 'react';
import { AuthProvider } from '../auth/AuthContext';
import { ScreenSizeProvider } from '../platform/ScreenSizeContext';

export const AppProvider = ({ children }: { children: ReactNode }): ReactNode => {
	return (
		<AuthProvider>
			<ScreenSizeProvider>{children}</ScreenSizeProvider>
		</AuthProvider>
	);
};
