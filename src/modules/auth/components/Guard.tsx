import { authenticatedVar } from '@/apollo-client';
import { useGetUser } from '../hooks/useGetUser';
import { useEffect } from 'react';

interface IGuardProps {
	children: JSX.Element;
}

const EXECUTED_ROUTES = ['/login', '/signup', '/'];

export const Guard = ({ children }: IGuardProps) => {
	const { data: user } = useGetUser();

	useEffect(() => {
		if (user) authenticatedVar(true);
	}, [user]);

	console.log(user);

	return <>{EXECUTED_ROUTES.includes(window.location.pathname) ? children : user && children}</>;
};
