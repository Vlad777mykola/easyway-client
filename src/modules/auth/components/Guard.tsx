import { authenticatedVar } from '@/apollo-client';
import { useGetUser } from '../hooks/useGetUser';
import { ReactNode, useEffect } from 'react';

interface IGuardProps {
	children: ReactNode;
}

const EXECUTED_ROUTES = ['/login', '/signup', '/profile', '/complete-test', '/test', '/'];

export const Guard = ({ children }: IGuardProps) => {
	const { data: user } = useGetUser();

	useEffect(() => {
		if (user) authenticatedVar(true);
	}, [user]);

	return <>{EXECUTED_ROUTES.includes(window.location.pathname) ? children : user && children}</>;
};
