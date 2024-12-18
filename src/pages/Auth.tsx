import { useLocation } from 'react-router-dom';
import { SignUp, Login } from '@/modules/auth';

export const Auth = () => {
	const location = useLocation();

	if (location.pathname === '/login') return <Login />;

	return <SignUp />;
};
