import React from 'react';
import { useState } from 'react';
import { TableProps } from 'antd';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Typography } from '@/ui-components/Typography';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Select } from '@/ui-components/Select';
import { Button } from '@/ui-components/Button';
import { filtersApi } from '@/shared/api/generated';
import { useWordsMutation } from '../../hooks/useWordsMutation';
import { schema } from '../../zod-schemas/form.schema';
import { FormValues } from '../../types';
import styles from './createWords.module.css';
import { Table } from '@/ui-components/Table';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const types = ['pronoun', 'noun', 'interjection', 'adjective', 'verb'];

const columns = [
	Table.EXPAND_COLUMN,
	{
		title: 'Name',
		dataIndex: 'name',
		key: 'name',
		sorter: (a: DataWords, b: DataWords) => a.name.localeCompare(b.name),
	},
	{
		title: 'Transcription',
		dataIndex: 'transcription',
		key: 'transcription',
	},
	{
		title: 'Translate',
		dataIndex: 'translate',
		key: 'translate',
	},
	{
		title: 'Type',
		dataIndex: 'type',
		key: 'type',
	},
	{
		title: 'Variants',
		dataIndex: 'variants',
		key: 'variants',
	},
];

type DataWords = {
	key: React.Key;
	name: string;
	transcription: string;
	translate: string;
	type: string;
	variants: string;
	description: string;
};

export const CreateWords = () => {
	const [tableWords, setTableWords] = useState<DataWords[]>([]);
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
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

	const addWord = (data: FormValues) => {
		console.log('DATA: ', data);
		clearForm();

		setTableWords((prev) => [
			...prev,
			{
				key: tableWords.length++,
				name: data.name,
				description: data.useCase,
				transcription: data.transcription,
				translate: data.translate,
				type: data.type,
				variants: data.variants.join(', '),
			},
		]);
	};

	const onSubmit = (data: FormValues) => {
		mutate(data);
	};

	const clearForm = () => {
		reset();
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		console.log('NEW SELECTED ROW KEYS: ', newSelectedRowKeys);
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const deleteRows = () => {
		const newRows = [];
		for (let i = 0; i < tableWords.length; i++) {
			for (let j = 0; j < selectedRowKeys.length; j++) {
				if (tableWords[i].key !== selectedRowKeys[j]) {
					newRows.push(tableWords[i]);
				}
			}
		}

		setTableWords(newRows);
	};

	const rowSelection: TableRowSelection<DataWords> = {
		selectedRowKeys,
		onChange: onSelectChange,
		selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT, Table.SELECTION_NONE],
	};

	console.log('FILTERS: ', filters);
	console.log('TABLE WORDS: ', tableWords);
	console.log('SELECTED ROW KEYS: ', selectedRowKeys);

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
				<Button disabled={isPending} type="primary" shape="round" onClick={handleSubmit(addWord)}>
					Add
				</Button>
			</div>
			<div className={styles.tableContainer}>
				<div className={styles.deleteButtonContainer}>
					<Button onClick={deleteRows}>Delete</Button>
				</div>
				<Table<DataWords>
					className={styles.table}
					size="small"
					expandable={{
						expandedRowRender: (record) => (
							<p className={styles.description}>{record.description}</p>
						),
					}}
					dataSource={tableWords}
					columns={columns}
					rowSelection={rowSelection}
				/>
			</div>
		</div>
	);
};
