import React, { useEffect } from 'react';
import { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { FormValues } from '../../types';
import styles from './addWordForm.module.css';
import { dataWordSchema } from '../../zod-schemas/form.schema';
import { wordsApi } from '@/shared/api/generated';
import { ApiError } from '@/shared/api/types';
import { CreateWordDto } from '@/shared/api/generated/model';

const types = ['pronoun', 'noun', 'interjection', 'adjective', 'verb'];

export const AddWordForm = ({
	setTableWords,
	isModal = false,
	filledData,
}: {
	setTableWords: React.Dispatch<React.SetStateAction<CreateWordDto[]>>;
	isModal?: boolean;
}) => {
	const [searchValue, setSearchValue] = useState('');
	const createWord = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(dataWordSchema),
	});
	const { field } = useController({ name: 'variants', control: createWord.control });
	const stringVariant = field.value || '';

	useEffect(() => {
		if (fillForm) {
			fillForm();
			//createWord.clearEditErrors();
		}
	}, [filledData]);

	const tagArray = stringVariant
		.split(',')
		.map((tag) => tag.trim())
		.filter((tag) => tag.length > 0);

	const { isPending } = wordsApi.useWordsControllerCreateWords<ApiError>({
		mutation: {
			onSuccess: () => {
				clearForm();
			},
			onError: (error) => {
				console.error('Error creating filter:', error);
			},
		},
	});

	const handleAdd = () => {
		createWord.setValue('variants', `${field.value}`);
	};

	const clearForm = () => {
		createWord.reset();
	};

	const addWord = (data: FormValues) => {
		clearForm();

		if (isModal) {
			setTableWords((prev) => {
				const filteredWords = prev.filter((word) =>
					types.some((type) => word[type] !== data[type]),
				);
				return [
					...filteredWords,
					{
						name: data.name,
						useCase: data.useCase,
						transcription: data.transcription,
						translate: data.translate,
						type: data.type as CreateWordDto['type'],
						variants: data.variants,
						imgUrl: '',
					},
				];
			});
		}

		if (!isModal) {
			setTableWords((prev) => [
				...prev,
				{
					name: data.name,
					useCase: data.useCase,
					transcription: data.transcription,
					translate: data.translate,
					type: data.type as CreateWordDto['type'],
					variants: data.variants,
					imgUrl: '',
				},
			]);
		}
	};

	const fillForm = () => {
		if (!filledData) return;
		Object.entries(filledData).forEach(([key, value]) => {
			createWord.setValue(key as keyof FormValues, value as string);
			if (key === 'variants' && Array.isArray(value)) {
				createWord.setValue('variants', value.join(',') as string);
			}
		});
	};

	return (
		<div className={styles.addWordForm}>
			<FieldGroup marginY="03" title="Name" error={createWord.formState.errors?.name?.message}>
				<Controller
					name="name"
					control={createWord.control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your title"
							size="middle"
							status={createWord.formState.errors?.name && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup
				marginY="03"
				title="Transcription"
				error={createWord.formState.errors?.transcription?.message}
			>
				<Controller
					name="transcription"
					control={createWord.control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your description"
							size="middle"
							status={createWord.formState.errors?.name && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup
				marginY="03"
				title="Translate"
				error={createWord.formState.errors?.translate?.message}
			>
				<Controller
					name="translate"
					control={createWord.control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your translate"
							size="middle"
							status={createWord.formState.errors?.name && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup
				marginY="03"
				title="Use Case"
				error={createWord.formState.errors?.useCase?.message}
			>
				<Controller
					name="useCase"
					control={createWord.control}
					render={({ field }) => (
						<Input
							{...field}
							placeholder="Enter your use case"
							size="middle"
							status={createWord.formState.errors?.useCase && 'error'}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup marginY="03" title="Type" error={createWord.formState.errors.type?.message}>
				<Controller
					name="type"
					control={createWord.control}
					render={({ field }) => (
						<Select
							{...field}
							placeholder="Select topics"
							options={types.map((i: string) => ({ label: i, value: i }))}
							status={createWord.formState.errors.type ? 'error' : undefined}
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
			</FieldGroup>
			<FieldGroup
				marginY="03"
				title="Variants"
				error={createWord.formState.errors.variants?.message}
			>
				<div className={styles.variantsContainer}>
					<Controller
						name="variants"
						control={createWord.control}
						render={({ field }) => (
							<div className={styles.variants}>
								<Select
									{...field}
									mode="tags"
									open={false}
									suffixIcon={null}
									placeholder="Press Enter to add tags"
									status={createWord.formState.errors.type ? 'error' : undefined}
									onSearch={(value) => setSearchValue(value)}
									onChange={(values) => {
										const joined = values.join(',');
										field.onChange(joined);
									}}
									value={tagArray}
								/>
							</div>
						)}
					/>
					<Button onClick={handleAdd}>Add</Button>
				</div>
			</FieldGroup>
			<div className={styles.collectionButtons}>
				<Button type="primary" shape="round" onClick={clearForm}>
					Clear
				</Button>
				<Button
					disabled={isPending}
					type="primary"
					shape="round"
					onClick={createWord.handleSubmit(addWord)}
				>
					{isModal ? 'Save' : 'Add'}
				</Button>
			</div>
		</div>
	);
};
