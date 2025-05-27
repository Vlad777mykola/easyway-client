import { ReactNode } from 'react';
import { useUser } from '@/shared/api-hooks/useUser';

const EXECUTED_ROUTES = ['/login', '/signup', '/profile', '/'];

export const Guard = ({ children }: { children: ReactNode }) => {
	const { data: user } = useUser();

	const isPublicRoute = EXECUTED_ROUTES.includes(window?.location?.pathname);

	return isPublicRoute ? children : user && children;
};
