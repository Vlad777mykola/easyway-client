import { Link } from 'react-router-dom';
import { useCreateUser } from '../hooks/useCreateUser';
import { useLogin } from '../hooks/useLogin';
import { Auth } from './Auth';

export const SignUp = () => {
	const [createUser] = useCreateUser();
	const { login } = useLogin();

	return (
		<>
			<Auth
				submitLabel={'SignUp'}
				onSubmit={async ({ email, password }): Promise<void> => {
					await createUser({
						variables: {
							createUserInput: {
								email,
								password,
							},
						},
					});
					await login({ email, password });
				}}
			>
				<Link to={'/login'}>Login</Link>
			</Auth>
		</>
	);
};
