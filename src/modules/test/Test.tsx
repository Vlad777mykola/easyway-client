import { Input } from 'antd';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Button } from '@/ui-components/Button';
import styles from './test.module.css';

interface SaveTest {
	sentence: string;
	ukrainian: string;
}

export const Test = () => {
	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<SaveTest>({
		defaultValues: {
			sentence: '',
			ukrainian: '',
		},
	});

	const onSubmit: SubmitHandler<SaveTest> = (data) => {
		console.log('Data: ', data);
	};

	return (
		<div className={styles.container}>
			<h1 className={styles.header}>Create Sentence</h1>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<div className={styles.formItem}>
					<p className={styles.nameOfItem}>English: </p>
					<Controller
						name="sentence"
						control={control}
						rules={{
							required: 'Input english sentence.',
							minLength: {
								value: 5,
								message: 'More than 5 characters.',
							},
							maxLength: {
								value: 30,
								message: 'No more than 30 characters.',
							},
							pattern: {
								value: /[A-za-z][?|!|.]/,
								message: 'Must be English letters and in the end of sentence ! or ? or .',
							},
						}}
						render={({ field }) => <Input size="large" {...field} />}
					/>
				</div>
				{errors.sentence && <p className={styles.errorMessage}>{errors.sentence.message}</p>}
				<div className={styles.formItem}>
					<p className={styles.nameOfItem}>Ukrainian: </p>
					<Controller
						name="ukrainian"
						control={control}
						rules={{
							required: 'Введіть перекладену відповідь.',
							minLength: {
								value: 5,
								message: 'Більше ніж 5 літер.',
							},
							maxLength: {
								value: 30,
								message: 'Не більше ніж 30 літер.',
							},
							pattern: {
								value: /[А-Яа-я][?|!|.]/,
								message: 'Повинні бути українські літери та в кінці речення! чи ? або .',
							},
						}}
						render={({ field }) => <Input size="large" {...field} />}
					/>
				</div>
				{errors.sentence && <p className={styles.errorMessage}>{errors.ukrainian?.message}</p>}
				<div className={styles.saveTestContainer}>
					<Button size="large" type="primary" htmlType="submit" block>
						Save Test
					</Button>
				</div>
			</form>
		</div>
	);
};
