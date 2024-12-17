import { ReactNode, useEffect, useState } from 'react';
import { Button } from 'antd';
import { Input } from 'antd';
import style from './auth.module.css';
import { useGetUser } from '../hooks/useGetUser';
import { useNavigate } from 'react-router-dom';

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
			<Input
				placeholder="email"
				value={auth.email}
				onChange={(e) => onChange(e.target.value, 'email')}
			/>
			<Input
				placeholder="password"
				value={auth.password}
				onChange={(e) => onChange(e.target.value, 'password')}
			/>
			<Button
				type="primary"
				onClick={() => onSubmit({ email: auth.email, password: auth.password })}
			>
				{submitLabel}
			</Button>
			{children}
		</div>
	);
};
