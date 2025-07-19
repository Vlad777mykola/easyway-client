import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { ErrorMessage } from '../error-message/ErrorMessage';
import { type CreateWordDto } from '@/shared/api/generated/model';
import { isValidWordForTable } from '../../utils/isValidForTable';
import type { FormValues } from '../../types';
import { dataWordSchema } from '../../zod-schemas/form.schema';
import { ALLOWED_TYPES } from '../../constants/constants';
import styles from './addWordForm.module.css';

export const AddWordForm = ({
	setTableWords,
	tableWords,
	wordName,
}: {
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>;
	tableWords: CreateWordDto[];
	wordName?: string;
}) => {
	const [error, setErrorMap] = useState<string>('');

	const { reset, setValue, getValues, handleSubmit, clearErrors, formState, control } =
		useForm<FormValues>({
			mode: 'onChange',
			resolver: zodResolver(dataWordSchema),
		});

	const { field } = useController({ name: 'variants', control });

	useEffect(() => {
		if (wordName) {
			getDefaultValuesForm(wordName);
			setErrorMap('');
			clearErrors();
		}
	}, [wordName, reset]);

	const getDefaultValuesForm = (wordName: string) => {
		const editWord = tableWords.find((w) => w.name === wordName);
		if (!editWord) return;

		(Object.keys(editWord) as (keyof CreateWordDto)[]).forEach((key) => {
			setValue(key, editWord[key]);
		});
	};

	const stringVariant = field.value || '';
	const tagArray = stringVariant
		.split(',')
		.map((tag) => tag.trim())
		.filter((tag) => tag.length > 0);

	const onSubmit = (data: FormValues) => {
		setTableWords((prev) => {
			let filteredWords = prev;

			if (!wordName && isValidWordForTable(data.name, prev)) {
				setErrorMap(`The word is already in the list ${data.name}`);
				return prev;
			}

			if (wordName && typeof isValidWordForTable(getValues('name'), prev) === 'undefined') {
				filteredWords = prev.filter((w) => w.name !== wordName);
			}

			if (wordName && isValidWordForTable(getValues('name'), prev)) {
				setErrorMap(`The word is already in the list ${data.name}`);
				return prev;
			}

			setErrorMap('');
			if (!wordName) reset();
			return [{ ...data, type: data.type as CreateWordDto['type'], imgUrl: '' }, ...filteredWords];
		});
	};

	return (
		<div className={styles.addWordForm}>
			<FieldGroup marginY="03" title="Name" error={formState.errors?.name?.message}>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your title"
							size="middle"
							status={formState.errors?.name && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup
				marginY="03"
				title="Transcription"
				error={formState.errors?.transcription?.message}
			>
				<Controller
					name="transcription"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your description"
							size="middle"
							status={formState.errors?.transcription && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup marginY="03" title="Translate" error={formState.errors?.translate?.message}>
				<Controller
					name="translate"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your translate"
							size="middle"
							status={formState.errors?.translate && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup marginY="03" title="Use Case" error={formState.errors?.useCase?.message}>
				<Controller
					name="useCase"
					control={control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your use case"
							size="middle"
							status={formState.errors?.useCase && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup marginY="03" title="Type" error={formState.errors.type?.message}>
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<Select
							{...field}
							placeholder="Select topics"
							options={ALLOWED_TYPES.map((i: string) => ({ label: i, value: i }))}
							status={formState.errors.type ? 'error' : undefined}
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup marginY="03" title="Variants" error={formState.errors.variants?.message}>
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
									status={formState.errors.variants ? 'error' : undefined}
									onChange={(values) => {
										const joined = values.join(',');
										field.onChange(joined);
									}}
									value={tagArray}
								/>
							</div>
						)}
					/>
					<Button onClick={() => setValue('variants', `${field.value}`)}>Add</Button>
				</div>
			</FieldGroup>
			{error && <ErrorMessage error={error} />}
			<div className={styles.collectionButtons}>
				<Button type="primary" shape="round" onClick={() => reset()}>
					Clear
				</Button>
				<Button type="primary" shape="round" onClick={handleSubmit(onSubmit)}>
					{wordName ? 'Save' : 'Add'}
				</Button>
			</div>
		</div>
	);
};
