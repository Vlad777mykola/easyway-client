import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useCreateUser } from '../hooks/useCreateUser';
import { useLogin } from '../hooks/useLogin';
import { useGetUser } from '../hooks/useGetUser';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import style from './signUp.module.css';

interface Data {
	email: string;
	password: string;
}

export const SignUp = () => {
	const [createUser] = useCreateUser();
	const { login } = useLogin();
	const navigate = useNavigate();
	const { data } = useGetUser();
	const [auth, setAuth] = useState({
		email: '',
		role: 'Student',
		username: '',
		password: '',
		repeatPassword: '',
	});

	const onChange = (value: string, key: 'email' | 'username' | 'password' | 'repeatPassword') => {
		setAuth((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const onSubmit = async ({ email, password }: Data): Promise<void> => {
		await createUser({
			variables: {
				createUserInput: {
					email,
					password,
				},
			},
		});
		await login({ email, password });
	};

	const changeRole = (role: string) => {
		setAuth((prev) => ({
			...prev,
			role,
		}));
	};

	useEffect(() => {
		if (data) {
			navigate('/');
		}
	}, [data, navigate]);

	console.log('AUTH: ', auth);

	return (
		<>
			<div className={style.authContainer}>
				<div className={style.signUpForm}>
					<h3 className={style.signUpHeader}>Sign Up</h3>
					<div className={style.switchRole}>
						<div className={style.role}>
							<Button
								className={style.button}
								onClick={() => changeRole('teacher')}
								type="text"
								disabled={auth.role === 'teacher'}
							>
								Teacher
							</Button>
						</div>
						<div className={style.role}>
							<Button
								className={style.button}
								onClick={() => changeRole('student')}
								type="text"
								disabled={auth.role === 'student'}
							>
								Student
							</Button>
						</div>
					</div>
					<div className={style.formItem}>
						<p className={style.nameOfItem}>Username: </p>
						<Input
							placeholder="username"
							value={auth.email}
							size="large"
							onChange={(e) => onChange(e.target.value, 'username')}
						/>
					</div>
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
					<div className={style.formItem}>
						<p className={style.nameOfItem}>Repeat Password: </p>
						<Input
							placeholder="repeat password"
							value={auth.password}
							size="large"
							onChange={(e) => onChange(e.target.value, 'repeatPassword')}
						/>
					</div>
					<div className={style.sendSignUp}>
						<Button
							type="primary"
							onClick={() => onSubmit({ email: auth.email, password: auth.password })}
							size="large"
							block
						>
							Sign Up
						</Button>
					</div>
				</div>
				<div>
					<Link className={style.login} to={'/login'}>
						Login
					</Link>
				</div>
			</div>
		</>
	);
};
