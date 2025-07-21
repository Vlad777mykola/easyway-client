import { Controller, useController, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormValues } from '../../types';
import { schema } from '../../zod-schemas/form.schema';
import { WrapperCard } from '@/features/wrap-card';
import { Select } from '@/ui-components/Select';
import { Typography } from '@/ui-components/Typography';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { capitalize } from '@/shared/utils/capitalize';

import styles from './addCollectionWords.module.css';
import { COLLECTIONS } from '@/shared/constants/collections/collections';
import { Input } from '@/ui-components/Input';
import { Button } from '@/ui-components/Button';
import { useCollectionsMutation } from '@/modules/create-collections/hooks/useCollectionsMutation';
import { TableWords } from '../table-words/TableWords';
import { useState } from 'react';

export type TableWord = {
	key: string;
	name: string;
};

export const AddCollectionWords = () => {
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

	const { mutate, isPending, error } = useCollectionsMutation(() => {
		clearForm();
	});

	const collections = [title, ...COLLECTIONS];
	console.log('LOCATION: ', title);

	const { TextArea } = Input;

	const clearForm = () => {
		resetField('words');
	};

	const addWord = (data: FormValues) => {
		const { words } = data;
		const wordsForTable = words.split(',').map((word) => ({
			key: word.trim(),
			name: word.trim(),
		}));
		console.log('DATA: ', data);
		setTableWords([...tableWords, ...wordsForTable]);
		clearForm();
		//mutate(data);
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
		console.log('RESULT: ', result);
		return result;
	};

	console.log('TABLE WORDS: ', tableWords);

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
					<Button disabled={isPending} type="primary" onClick={handleSubmit(addWord)}>
						Add
					</Button>
				</div>
				<div className={styles.tableWords}>
					<TableWords tableWords={tableWords} setTableWords={setTableWords} />
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
