import { ReactNode, useEffect, useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import { useGetUser } from '../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';
import style from './auth.module.css';

export const Auth = ({
	submitLabel,
	onSubmit,
	children,
}: {
	submitLabel: string;
	onSubmit: (req: { email: string; password: string }) => Promise<void>;
	children: ReactNode;
}) => {
	const navigate = useNavigate();
	const [auth, setAuth] = useState({
		email: '',
		password: '',
	});

	const { data } = useGetUser();

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

	return (
		<div className={style.authContainer}>
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
					<Input.Password
						placeholder="password"
						value={auth.password}
						size="large"
						onChange={(e) => onChange(e.target.value, 'password')}
					/>
				</div>
				<div className={style.sendLogin}>
					<Button
						type="primary"
						onClick={() => onSubmit({ email: auth.email, password: auth.password })}
						size="large"
						block
					>
						{submitLabel}
					</Button>
				</div>
			</div>
			<div>{children}</div>
		</div>
	);
};
