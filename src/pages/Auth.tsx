import { SignUp, Signin } from '@/modules/auth';

export const Auth = ({ isSignup = false }: { isSignup?: boolean }) => {
	if (isSignup) return <Signin />;

	return <SignUp />;
};
