import { Control, Controller, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { Typography } from '@/ui-components/Typography';
import { FormValues } from '../../types';
import styles from './addWordForm.module.css';

const types = ['pronoun', 'noun', 'interjection', 'adjective', 'verb'];

export const AddWordForm = ({
	errors,
	control,
	error,
	isPending,
	handleAdd,
	clearForm,
	addWord,
	handleSubmit,
}: {
	errors: FieldErrors<FormValues>;
	control: Control<FormValues>;
	error: Error | null;
	isPending: boolean;
	handleAdd: () => void;
	clearForm: () => void;
	addWord: (data: FormValues) => void;
	handleSubmit: UseFormHandleSubmit<FormValues>;
}) => (
	<div className={styles.addWordForm}>
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
			<div className={styles.variantsContainer}>
				<Controller
					name="variants"
					control={control}
					render={({ field }) => (
						<div className={styles.variants}>
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
						</div>
					)}
				/>
				<Button onClick={handleAdd}>Add</Button>
			</div>
		</FieldGroup>
		{error && <Typography.Text type="danger">{error?.message}</Typography.Text>}
		<div className={styles.collectionButtons}>
			<Button type="primary" shape="round" onClick={clearForm}>
				Clear
			</Button>
			<Button disabled={isPending} type="primary" shape="round" onClick={handleSubmit(addWord)}>
				Add
			</Button>
		</div>
	</div>
);
