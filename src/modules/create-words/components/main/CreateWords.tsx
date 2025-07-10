import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/ui-components/Typography';
import { Button } from '@/ui-components/Button';
import { AddWordForm } from '../add-word-form/AddWordForm';
import { AddXmlFile } from '../add-xml-file/AddXmlFile';
import { AddJsonFile } from '../add-json-file/AddJsonFile';
import { TableWords } from '../table-words/TableWords';
import { dataWordSchema } from '../../zod-schemas/form.schema';
import { FormValues } from '../../types';
import { wordsApi } from '@/shared/api/generated';
import { ApiError } from '@/shared/api/types';
import { CreateWordDto } from '@/shared/api/generated/model';

import styles from './createWords.module.css';

export const CreateWords = () => {
	const [tableWords, setTableWords] = useState<CreateWordDto[]>([]);
	const isDisabled = tableWords.length === 0;

	const { mutate, isPending, error } = wordsApi.useWordsControllerCreateWords<ApiError>({
		mutation: {
			onSuccess: () => {
				clearForm();
			},
			onError: (error) => {
				console.error('Error creating filter:', error);
			},
		},
	});

	// const createWord = useForm<FormValues>({
	// 	mode: 'onChange',
	// 	resolver: zodResolver(dataWordSchema),
	// });

	// const editWord = useForm<FormValues>({
	// 	resolver: zodResolver(dataWordSchema),
	// });

	// const variants = createWord.watch('variants');

	// const getSelectInputValue = (): string => {
	// 	const input = document.querySelector('.ant-select-selector input') as HTMLInputElement;
	// 	return input?.value?.trim() || '';
	// };

	const handleAdd = () => {
		// const newValue = getSelectInputValue();
		// if (newValue && !variants.includes(newValue)) {
		// 	createWord.setValue('variants', [...variants, newValue]);
		// }
	};

	const handleAddEdit = () => {
		// const newValue = getSelectInputValue();
		// if (newValue && !variants.includes(newValue)) {
		// 	editWord.setValue('variants', [...variants, newValue]);
		// }
	};

	// const addWord = (data: FormValues) => {
	// 	clearForm();

	// 	setTableWords((prev) => [
	// 		...prev,
	// 		{
	// 			name: data.name,
	// 			useCase: data.useCase,
	// 			transcription: data.transcription,
	// 			translate: data.translate,
	// 			type: data.type as CreateWordDto['type'],
	// 			variants: data.variants,
	// 			imgUrl: '',
	// 		},
	// 	]);
	// };

	console.log('TABLE WORDS: ', tableWords);

	const editWordAndClose = (editObject: FormValues) => {
		const filteredWords = tableWords.filter((word) => word.name !== editObject.name);
		setTableWords([
			...filteredWords,
			{
				...editObject,
				type: editObject.type as CreateWordDto['type'],
				variants: editObject.variants,
				imgUrl: '',
			},
		]);
	};

	const onSubmit = (data: CreateWordDto[]) => {
		mutate({ data: { words: data } });
	};

	// const clearForm = () => {
	// 	createWord.reset();
	// };

	// const clearEditForm = () => {
	// 	editWord.setValue('name', '');
	// 	editWord.setValue('useCase', '');
	// 	editWord.setValue('transcription', '');
	// 	editWord.setValue('translate', '');
	// 	editWord.setValue('type', '');
	// 	editWord.setValue('variants', '');
	// };

	// const editWordForm = {
	// 	errors: editWord.formState.errors,
	// 	control: editWord.control,
	// 	isPending,
	// 	clearEditErrors: editWord.clearErrors,
	// 	setValue: editWord.setValue,
	// 	clearForm: clearEditForm,
	// 	addWord: editWordAndClose,
	// 	handleAdd: handleAddEdit,
	// 	handleSubmit: editWord.handleSubmit,
	// };

	// const createWordForm = {
	// 	errors: createWord.formState.errors,
	// 	control: createWord.control,
	// 	isPending,
	// 	clearForm,
	// 	addWord,
	// 	handleAdd,
	// 	handleSubmit: createWord.handleSubmit,
	// };

	return (
		<div className={styles.container}>
			<Typography.Title className={styles.title} level={2}>
				Create new word
			</Typography.Title>
			<div className={styles.formContent}>
				<AddWordForm setTableWords={setTableWords} />
				<AddXmlFile tableWords={tableWords} setTableWords={setTableWords} />
				{/* <AddJsonFile
					errors={createWord.formState.errors}
					control={createWord.control}
					tableWords={tableWords}
					setTableWords={setTableWords}
				/> */}
			</div>
			<TableWords tableWords={tableWords} setTableWords={setTableWords} />
			{error && <Typography.Text type="danger">{error?.message}</Typography.Text>}
			<div className={styles.submitButton}>
				<Button
					type="primary"
					shape="round"
					disabled={isDisabled}
					onClick={() => onSubmit(tableWords)}
				>
					Submit
				</Button>
			</div>
		</div>
	);
};
