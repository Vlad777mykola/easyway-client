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
import { dataWordSchema, editWordSchema } from '../../zod-schemas/form.schema';
import { FormValues, EditFormValues } from '../../types';
import styles from './createWords.module.css';

export type DataWords = {
	name: string;
	transcription: string;
	translate: string;
	type: string;
	variants: string;
	useCase: string;
	key?: React.Key;
};

export const CreateWords = () => {
	const [tableWords, setTableWords] = useState<DataWords[]>([]);

	const { mutate, isPending, error } = useWordsMutation(() => {
		clearForm();
	});

	const createWord = useForm<FormValues>({
		mode: 'onChange',
		resolver: zodResolver(dataWordSchema),
	});

	const editWord = useForm<EditFormValues>({
		resolver: zodResolver(editWordSchema),
	});

	const variants = createWord.watch('variants');

	const getSelectInputValue = (): string => {
		const input = document.querySelector('.ant-select-selector input') as HTMLInputElement;
		return input?.value?.trim() || '';
	};

	const handleAdd = () => {
		const newValue = getSelectInputValue();
		if (newValue && !variants.includes(newValue)) {
			createWord.setValue('variants', [...variants, newValue]);
		}
	};

	const handleAddEdit = () => {
		const newValue = getSelectInputValue();
		if (newValue && !variants.includes(newValue)) {
			editWord.setValue('variants', [...variants, newValue]);
		}
	};

	const addWord = (data: FormValues) => {
		clearForm();

		setTableWords((prev) => [
			...prev,
			{
				key: data.name,
				name: data.name,
				useCase: data.useCase,
				transcription: data.transcription,
				translate: data.translate,
				type: data.type,
				variants: data.variants.join(', '),
			},
		]);
	};

	const editWordAndClose = (editObject: EditFormValues) => {
		const filteredWords = tableWords.filter((word) => word.key !== editObject.key);
		setTableWords([...filteredWords, { ...editObject, variants: editObject.variants.join(', ') }]);
	};

	const onSubmit = (data: DataWords[]) => {
		mutate(data);
	};

	const clearForm = () => {
		createWord.reset();
	};

	const clearEditForm = () => {
		editWord.reset();
	};

	const editWordForm = {
		errors: editWord.formState.errors,
		control: editWord.control,
		error,
		isPending,
		clearEditErrors: editWord.clearErrors,
		setValue: editWord.setValue,
		clearForm: clearEditForm,
		addWord: editWordAndClose,
		handleAdd: handleAddEdit,
		handleSubmit: editWord.handleSubmit,
	};

	const createWordForm = {
		errors: createWord.formState.errors,
		control: createWord.control,
		error,
		isPending,
		clearForm,
		addWord,
		handleAdd,
		handleSubmit: createWord.handleSubmit,
	};

	console.log('ERRORS: ', createWord.formState.errors);

	return (
		<div className={styles.container}>
			<Typography.Title className={styles.title} level={2}>
				Create new word
			</Typography.Title>
			<div className={styles.formContent}>
				<AddWordForm createWordForm={createWordForm} />
				<AddXmlFile
					errors={createWord.formState.errors}
					control={createWord.control}
					tableWords={tableWords}
					setTableWords={setTableWords}
				/>
				<AddJsonFile
					errors={createWord.formState.errors}
					control={createWord.control}
					tableWords={tableWords}
					setTableWords={setTableWords}
				/>
			</div>
			<TableWords
				tableWords={tableWords}
				editWordForm={editWordForm}
				setTableWords={setTableWords}
			/>
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
