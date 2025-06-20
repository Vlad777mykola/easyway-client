import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/ui-components/Typography';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Select } from '@/ui-components/Select';
import { filtersApi } from '@/shared/api/generated';
import { useWordsMutation } from '../../hooks/useWordsMutation';
import { schema } from '../../zod-schemas/form.schema';
import { FormValues } from '../../types';
import styles from './createWords.module.css';
import { Button } from '@/ui-components/Button';

const types = ['pronoun', 'noun', 'interjection', 'adjective', 'verb'];

export const CreateWords = () => {
	const { data: filters } = filtersApi.useFiltersControllerFindSuspense();

	const { mutate, isPending, error } = useWordsMutation(() => {
		clearForm();
	});

	const {
		reset,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		resolver: zodResolver(schema),
	});

	const onSubmit = (data: FormValues) => {
		mutate(data);
	};

	const clearForm = () => {
		reset();
	};

	console.log('FILTERS: ', filters);

	return (
		<div className={styles.container}>
			<Typography.Title className={styles.title} level={2}>
				Create new word
			</Typography.Title>
			<div className={styles.formContent}>
				<FieldGroup marginY="03" title="Name" error={errors?.name?.message}>
					<Controller
						name="name"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter your title"
								size="middle"
								status={errors?.name && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Transcription" error={errors?.transcription?.message}>
					<Controller
						name="transcription"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter your description"
								size="middle"
								status={errors?.name && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Translate" error={errors?.translate?.message}>
					<Controller
						name="translate"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter your translate"
								size="middle"
								status={errors?.name && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Use Case" error={errors?.useCase?.message}>
					<Controller
						name="useCase"
						control={control}
						render={({ field }) => (
							<Input
								{...field}
								placeholder="Enter your use case"
								size="middle"
								status={errors?.useCase && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Type" error={errors.type?.message}>
					<Controller
						name="type"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select topics"
								options={types.map((i: string) => ({ label: i, value: i }))}
								status={errors.type ? 'error' : undefined}
								onChange={field.onChange}
								value={field.value}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Variants" error={errors.type?.message}>
					<Controller
						name="variants"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								mode="tags"
								open={false}
								suffixIcon={null}
								placeholder="Press Enter to add tags"
								status={errors.type ? 'error' : undefined}
								onChange={field.onChange}
								value={field.value}
							/>
						)}
					/>
				</FieldGroup>
			</div>
			{error && <Typography.Text type="danger">{error?.message}</Typography.Text>}
			<div className={styles.collectionButtons}>
				<Button type="primary" shape="round" onClick={clearForm}>
					Clear
				</Button>
				<Button disabled={isPending} type="primary" shape="round" onClick={handleSubmit(onSubmit)}>
					Submit
				</Button>
			</div>
		</div>
	);
};
