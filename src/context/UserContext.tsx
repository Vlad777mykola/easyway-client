import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

export interface UserData {
	username: string;
	email: string;
	password: string;
}

interface IUserContext {
	user: UserData;
	setUser: Dispatch<SetStateAction<UserData>>;
}

interface IUserProvider {
	children: ReactNode;
}

const UserContext = createContext<IUserContext>({
	user: {
		username: '',
		email: '',
		password: '',
	},
	setUser: () => {},
});

const UserProvider = ({ children }: IUserProvider) => {
	const [user, setUser] = useState<UserData>({
		username: '',
		email: '',
		password: '',
	});

	return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
