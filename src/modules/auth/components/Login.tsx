import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { authenticatedVar } from '@/shared/apollo-client';
import { useLogin } from '../hooks/useLogin';
import { useReactiveVar } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { useGetUser } from '../hooks/useGetUser';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import style from './login.module.css';

export const Login = () => {
	const navigate = useNavigate();
	const [auth, setAuth] = useState({
		email: '',
		password: '',
	});
	const { data } = useGetUser();
	const { login } = useLogin();

	useEffect(() => {
		if (data) {
			navigate('/');
		}
	}, [data, navigate]);

	const onChange = (value: string, key: 'email' | 'password') => {
		setAuth((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const authenticated = useReactiveVar(authenticatedVar);

	return (
		<WrapperCard>
			<div className={style.loginContainer}>
				<div className={style.loginForm}>
					<h3 className={style.loginHeader}>Login</h3>
					<div className={style.formItem}>
						<p className={style.nameOfItem}>Email: </p>
						<Input
							placeholder="email"
							value={auth.email}
							size="large"
							onChange={(e) => onChange(e.target.value, 'email')}
						/>
					</div>
					<div className={style.formItem}>
						<p className={style.nameOfItem}>Password: </p>
						<Input
							placeholder="password"
							value={auth.password}
							size="large"
							onChange={(e) => onChange(e.target.value, 'password')}
						/>
					</div>
					{authenticated}
					<div className={style.sendLogin}>
						<Button type="primary" onClick={() => login(auth)} size="large" block>
							Login
						</Button>
					</div>
				</div>
				<div className={style.signUpContainer}>
					<Link className={style.signUp} to={'/signup'}>
						Sing Up
					</Link>
				</div>
			</div>
		</WrapperCard>
	);
};
