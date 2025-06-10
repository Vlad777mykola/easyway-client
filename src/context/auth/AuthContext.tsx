import { useUser } from '@/shared/api-hooks/useUser';
import { UserProvider } from './types';
import { AuthContext } from './index';

export const AuthProvider = ({ children }: UserProvider) => {
	const { data: user, refetch } = useUser();

	return (
		<AuthContext.Provider value={{ user, isLogIn: !!user?.id, refetch }}>
			{children}
		</AuthContext.Provider>
	);
};
