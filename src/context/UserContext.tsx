import { useGetUser } from '@/modules/auth/hooks/useGetUser';
import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

type UserData = {
	username: string;
	email: string;
};

type UserContextType = {
	user: UserData;
	setUser: Dispatch<SetStateAction<UserData>>;
};

type UserProviderType = {
	children: ReactNode;
};

const UserContext = createContext<UserContextType>({
	user: {
		username: '',
		email: '',
	},
	setUser: () => {},
});

const UserProvider = ({ children }: UserProviderType) => {
	const { data } = useGetUser();
	const [user, setUser] = useState<UserData>({
		username: '',
		email: '',
	});

	/* setUser(data?.me || ''); */

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
