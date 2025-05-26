import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Typography } from '@/ui-components/Typography';
import z from 'zod';

import style from './login.module.css';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const INITIAL_FORM_STATE = {
	email: '',
	password: '',
};

const formDataSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

type FormData = z.infer<typeof formDataSchema>;

export const Signin = () => {
	const [authData, setAuth] = useState<Partial<FormData>>({});
	const [showErrors, setShowErrors] = useState(false);

	const mutation = useMutation({
		mutationFn: (data: { email: string; password: string }) => {
			return axios.post('http://localhost:3000/auth/signup', data);
		},
	});

	const formData = {
		...INITIAL_FORM_STATE,
		// ...fetchedData,
		...authData,
	};

	const validate = () => {
		const res = formDataSchema.safeParse(formData);

		if (res.success) {
			return undefined;
		}

		return res.error.format();
	};
	const onChange = (value: string, key: keyof typeof INITIAL_FORM_STATE) => {
		setAuth((prev) => ({
			...prev,
			[key]: value,
		}));
	};
	const onSubmit = (formData: FormData) => {
		if (validate()) {
			setShowErrors(true);
		}
		mutation.mutate({ email: formData.email, password: formData.password });
	};

	const errors = showErrors ? validate() : undefined;
	return (
		<WrapperCard>
			<div className={style.loginContainer}>
				<div className={style.loginForm}>
					<Typography.Title className={style.signUpHeader} level={3}>
						Sign In
					</Typography.Title>

					<div>
						<Typography.Title marginY="05" level={5}>
							Email
						</Typography.Title>
						<Input
							type="email"
							placeholder="Enter your email"
							value={formData.email}
							size="middle"
							status={errors?.email ? 'error' : undefined}
							onChange={(e) => onChange(e.target.value, 'email')}
						/>
						{errors?.email && (
							<Typography.Text type="danger">{errors.email._errors[0]}</Typography.Text>
						)}
					</div>

					<div>
						<Typography.Title marginY="05" level={5}>
							Password
						</Typography.Title>
						<Input
							type="password"
							placeholder="Enter your password"
							value={formData.password}
							size="middle"
							status={errors?.password ? 'error' : undefined}
							onChange={(e) => onChange(e.target.value, 'password')}
						/>
						{errors?.password && (
							<Typography.Text type="danger">{errors.password._errors[0]}</Typography.Text>
						)}
					</div>
					<div className={style.sendLogin}>
						<Button type="primary" onClick={() => onSubmit(formData)} size="large" block>
							Sign in
						</Button>
					</div>
				</div>
				<div className={style.signUpContainer}>
					<Link className={style.signUp} to={'/signup'}>
						Sing up
					</Link>
				</div>
			</div>
		</WrapperCard>
	);
};
