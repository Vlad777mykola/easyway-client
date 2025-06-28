import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/ui-components/Typography';
import { Button } from '@/ui-components/Button';
import { AddWordForm } from '../add-word-form/AddWordForm';
import { AddXmlFile } from '../add-xml-file/AddXmlFile';
import { AddJsonFile } from '../add-json-file/AddJsonFile';
import { TableWords } from '../table-words/TableWords';
import { useWordsMutation } from '../../hooks/useWordsMutation';
import { dataWordSchema } from '../../zod-schemas/form.schema';
import { FormValues } from '../../types';
import styles from './createWords.module.css';

export type DataWords = {
	key: React.Key;
	name: string;
	transcription: string;
	translate: string;
	type: string;
	variants: string;
	useCase: string;
};

export const CreateWords = () => {
	const [tableWords, setTableWords] = useState<DataWords[]>([]);

	const { mutate, isPending, error } = useWordsMutation(() => {
		clearForm();
	});

	const {
		reset,
		control,
		setValue,
		watch,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(dataWordSchema),
	});

	const variants = watch('variants');

	const getSelectInputValue = (): string => {
		const input = document.querySelector('.ant-select-selector input') as HTMLInputElement;
		return input?.value?.trim() || '';
	};

	const handleAdd = () => {
		const newValue = getSelectInputValue();
		if (newValue && !variants.includes(newValue)) {
			setValue('variants', [...variants, newValue]);
		}
	};

	const addWord = (data: FormValues) => {
		clearForm();

		setTableWords((prev) => [
			...prev,
			{
				key: tableWords.length++,
				name: data.name,
				useCase: data.useCase,
				transcription: data.transcription,
				translate: data.translate,
				type: data.type,
				variants: data.variants.join(', '),
			},
		]);
	};

	const onSubmit = (data: DataWords[]) => {
		mutate(data);
	};

	const clearForm = () => {
		reset();
	};

	return (
		<div className={styles.container}>
			<Typography.Title className={styles.title} level={2}>
				Create new word
			</Typography.Title>
			<div className={styles.formContent}>
				<AddWordForm
					errors={errors}
					control={control}
					isPending={isPending}
					error={error}
					clearForm={clearForm}
					addWord={addWord}
					handleAdd={handleAdd}
					handleSubmit={handleSubmit}
				/>
				<AddXmlFile
					errors={errors}
					control={control}
					tableWords={tableWords}
					setTableWords={setTableWords}
				/>
				<AddJsonFile
					errors={errors}
					control={control}
					tableWords={tableWords}
					setTableWords={setTableWords}
				/>
			</div>
			<TableWords tableWords={tableWords} setTableWords={setTableWords} />
			<div className={styles.submitButton}>
				<Button
					type="primary"
					shape="round"
					disabled={tableWords.length === 0}
					onClick={() => onSubmit(tableWords)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
