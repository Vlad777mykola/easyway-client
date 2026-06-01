import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues } from '../../types';
import { schema } from '../../zod-schemas/form.schema';
import { WrapperCard } from '@/features/wrap-card';
import { TableWords } from '@/features/table-words';
import { Select } from '@/ui-components/Select';
import { Typography } from '@/ui-components/Typography';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { ErrorMessage } from '@/ui-components/ErrorMessage';
import { COLLECTIONS } from '@/shared/constants/collections/collections';
import { useCollectionsMutation } from '@/modules/create-collections/hooks/useCollectionsMutation';

import styles from './addCollectionWords.module.css';

export type TableWord = {
	key: string;
	name: string;
};

export const AddCollectionWords = () => {
	const [error, setError] = useState('');
	const location = useLocation();
	const { title, topic, tenses, level, description, category } = location.state;
	const [tableWords, setTableWords] = useState<TableWord[]>([]);
	const {
		getValues,
		resetField,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormValues>({
		defaultValues: {
			collectionName: title,
		},
		resolver: zodResolver(schema),
	});

	const { isPending } = useCollectionsMutation(() => {
		clearForm();
	});

	const collections = [title, ...COLLECTIONS];

	const { TextArea } = Input;

	const clearForm = () => {
		resetField('words');
	};

	const checkUniqueItems = (wordsForTable: TableWord[]) => {
		const sameWords: string[] = [];
		const uniqueWords: TableWord[] = [];
		let error = '';

		wordsForTable.forEach((word) => {
			const hasSameWord = tableWords.find((wordForTable) => wordForTable.name === word.name);

			if (hasSameWord) {
				sameWords.push(word.name);
			} else {
				uniqueWords.push(word);
			}
		});

		if (sameWords.length > 0) {
			error = `Table contain same words: ${sameWords.join(', ')}`;
		}

		return { uniqueWords: uniqueWords, error: error };
	};

	const addWords = (data: FormValues) => {
		const { words } = data;
		const wordsForTable = words
			.split(',')
			.filter((word) => word !== '')
			.map((word) => ({
				key: word.trim(),
				name: word.trim(),
			}));

		const { uniqueWords, error } = checkUniqueItems(wordsForTable);

		setTableWords([...tableWords, ...uniqueWords]);
		setError(error);
		if (!error) {
			clearForm();
		}
	};

	const onSubmit = () => {
		const words = tableWords.map((item) => item.name.trim()).join(', ');
		const result = {
			title: getValues('collectionName'),
			topic,
			tenses,
			level,
			description,
			category,
			words: words,
		};
		//mutate(result);
		return result;
	};

	return (
		<WrapperCard>
			<div className={styles.container}>
				<Typography.Title className={styles.title} level={2}>
					Create new collection
				</Typography.Title>
				<FieldGroup marginY="03" title="Collection Name" error={errors.collectionName?.message}>
					<Controller
						name="collectionName"
						control={control}
						render={({ field }) => (
							<Select
								{...field}
								placeholder="Select topics"
								options={collections.map((i: string) => ({ label: i, value: i }))}
								status={errors.collectionName ? 'error' : undefined}
								onChange={field.onChange}
								value={field.value}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup marginY="03" title="Words for collection" error={errors.words?.message}>
					<Controller
						name="words"
						control={control}
						render={({ field }) => <TextArea {...field} />}
					/>
				</FieldGroup>
				<div className={styles.collectionButtons}>
					<Button type="primary" onClick={clearForm}>
						Clear
					</Button>
					<Button disabled={isPending} type="primary" onClick={handleSubmit(addWords)}>
						Add
					</Button>
				</div>
				<div className={styles.tableWords}>
					<TableWords tableWords={tableWords} setTableWords={setTableWords} />
					{error && <ErrorMessage error={error} />}
				</div>
			</div>
			<div className={styles.submitButton}>
				<Button type="primary" onClick={onSubmit}>
					Submit
				</Button>
			</div>
		</WrapperCard>
	);
};
