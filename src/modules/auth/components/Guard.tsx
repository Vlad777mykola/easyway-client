import { authenticatedVar } from '@/apollo-client';
import { useGetUser } from '../hooks/useGetUser';
import { ReactNode, useEffect } from 'react';

//const EXECUTED_ROUTES = ['/login', '/signup', '/profile', '/complete-test', '/test', '/'];

export const Guard = ({ children }: { children: ReactNode }) => {
	const { data: user } = useGetUser();

	useEffect(() => {
		if (user) authenticatedVar(true);
	}, [user]);

	return children; //<>{EXECUTED_ROUTES.includes(window.location.pathname) ? children : user && children}</>;
};
