import { Link } from 'react-router-dom';
import { authenticatedVar } from '@/apollo-client';
import { useLogin } from '../hooks/useLogin';
import { Auth } from './Auth';
import { useReactiveVar } from '@apollo/client';
import style from './login.module.css';

export const Login = () => {
	const { login } = useLogin();
	const authenticated = useReactiveVar(authenticatedVar);

	console.log('AUTHENTICATED: ', authenticated);

	return (
		<>
			<Auth submitLabel={'Login'} onSubmit={(request) => login(request)}>
				<Link className={style.signUp} to={'/signup'}>
					Sing Up
				</Link>
				{/* {`${authenticated}`} */}
			</Auth>
		</>
	);
};
