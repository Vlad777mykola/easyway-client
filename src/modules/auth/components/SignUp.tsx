import { z } from 'zod';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { WrapperCard } from '@/features/Wrapper-card';
import axios from 'axios';

import style from './signUp.module.css';
import { useMutation } from '@tanstack/react-query';

const INITIAL_FORM_STATE = {
	email: '',
	password: '',
	repeatPassword: '',
};

const formDataSchema = z
	.object({
		email: z.string().email(),
		password: z.string().min(4, 'Password must be at least 4 characters'),
		repeatPassword: z.string().min(4, 'Password must be at least 4 characters'),
	})
	.refine((data) => data.password === data.repeatPassword, {
		message: "Passwords don't match",
		path: ['repeatPassword'],
	});

type FormData = z.infer<typeof formDataSchema>;

export const SignUp = () => {
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
			<div className={style.signUpContainer}>
				<div className={style.signUpForm}>
					<Typography.Title className={style.signUpHeader} level={3}>
						Sign Up
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

					<div>
						<Typography.Title marginY="05" level={5}>
							Repeat Password
						</Typography.Title>
						<Input
							type="password"
							placeholder="Repeat your password"
							value={formData.repeatPassword}
							size="middle"
							status={errors?.repeatPassword ? 'error' : undefined}
							onChange={(e) => onChange(e.target.value, 'repeatPassword')}
						/>
						{errors?.repeatPassword && (
							<Typography.Text type="danger">{errors.repeatPassword._errors[0]}</Typography.Text>
						)}
					</div>

					<div className={style.sendSignUp}>
						<Button type="primary" onClick={() => onSubmit(formData)} size="large" block>
							Sign Up
						</Button>
					</div>
				</div>

				<div className={style.loginContainer}>
					<Link className={style.login} to={'/signin'}>
						Sign in
					</Link>
				</div>
			</div>
		</WrapperCard>
	);
};
