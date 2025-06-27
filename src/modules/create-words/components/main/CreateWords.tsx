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
import {
	dataWordsArraySchema,
	dataWordSchema,
	arrayOfFilledWordsSchema,
	arrayOfHasRequiredKeysJson,
	arrayOfHasRequiredKeysXml,
} from '../../zod-schemas/form.schema';
import { FormValues } from '../../types';
import styles from './createWords.module.css';
import { Table } from '@/ui-components/Table';
import { Space } from '@/ui-components/Space';
import { Icon } from '@/ui-components/Icon';
import { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

const types = ['pronoun', 'noun', 'interjection', 'adjective', 'verb'];

export type DataWords = {
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
	const [xmlInputError, setXmlInputError] = useState('');
	const [jsonInputError, setJsonInputError] = useState('');
	const [, setSearchText] = useState('');
	const [, setSearchedColumn] = useState<keyof DataWords | ''>('');
	const { data: filters } = filtersApi.useFiltersControllerFindSuspense();

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

	console.log('ERRORS FORM: ', errors);

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
		const newRows = tableWords.filter((row) => !selectedRowKeys.includes(row.key));
		setTableWords(newRows);
	};

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: keyof DataWords,
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters?: () => void) => {
		clearFilters?.();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex: keyof DataWords): ColumnType<DataWords> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
					placeholder={`Search ${dataIndex}`}
					value={selectedKeys[0]}
					onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
					onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
					style={{ marginBottom: 8, display: 'block' }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
						icon={<Icon icon="search" />}
						size="small"
						style={{ width: 90 }}
					>
						Search
					</Button>
					<Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
						Reset
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<Icon icon="search" size="xs" variant={filtered ? 'primary' : 'secondary'} />
		),
		onFilter: (value, record) =>
			record[dataIndex]
				?.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase()),
	});

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		if (!file) return;

		if (file && file.type === 'text/xml') {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const xmlString = e.target?.result as string;
				parseXML(xmlString);
			};
			reader.readAsText(file);
		}

		if (file && file.type === 'application/json') {
			const reader = new FileReader();
			reader.onload = (e: ProgressEvent<FileReader>) => {
				const jsonString = e.target?.result as string;
				parseJSON(jsonString);
			};
			reader.readAsText(file);
		}
	};

	const parseJSON = (jsonString: string) => {
		const json = JSON.parse(jsonString);
		const parseFilledSchema = arrayOfFilledWordsSchema.safeParse(json);
		const parsedAllKeys = arrayOfHasRequiredKeysJson.safeParse(json);
		console.log('PARSE FILLED SCHEMA: ', parseFilledSchema);
		console.log('PARSED ALL KEYS: ', parsedAllKeys);

		if (!parseFilledSchema.success) {
			setJsonInputError(parseFilledSchema.error.errors[0].message);
			return;
		} else {
			setJsonInputError('');
		}

		if (!parsedAllKeys.success) {
			setJsonInputError(parsedAllKeys.error.errors[0].message);
			return;
		} else {
			setJsonInputError('');
		}

		console.log('JSON FILE: ', json);

		const result: DataWords[] = json.map((word) => ({
			key: word.name,
			name: word.name,
			transcription: word.transcription,
			translate: word.translate,
			type: word.type,
			description: word.useCase,
			variants: word.variants.join(', '),
		}));

		const merged = [...tableWords, ...result];
		const parseCondition = dataWordsArraySchema.safeParse(merged);

		if (!parseCondition.success) {
			console.log('Validation error:', parseCondition.error.errors);
			setJsonInputError(parseCondition.error.errors[0].message);
		} else {
			console.log('Valid data:', parseCondition.data);
			setJsonInputError('');
		}

		console.log('PARSE CONDITION: ', parseCondition);

		const uniqueWords = Array.from(
			new Map([...tableWords, ...result].map((word) => [word.name, word])).values(),
		);

		console.log('RESULT: ', result);
		console.log('UNIQUE WORDS: ', uniqueWords);

		setTableWords(uniqueWords);
	};

	console.log('NO JSON: ', JSON.parse('123'));

	const parseXML = (xmlString: string) => {
		const parser = new DOMParser();
		const xml = parser.parseFromString(xmlString, 'application/xml');

		console.log('XML: ', xml);

		const items: DataWords[] = Array.from(xml.getElementsByTagName('word')).map((item) => {
			const variantsParent = item.getElementsByTagName('variants')[0];
			const variants = variantsParent
				? Array.from(variantsParent.getElementsByTagName('variant'))
						.map((v) => v.textContent)
						.join(', ')
				: '';

			return {
				key: item.getElementsByTagName('name')[0].textContent || '',
				name: item.getElementsByTagName('name')[0].textContent || '',
				transcription: item.getElementsByTagName('transcription')[0].textContent || '',
				translate: item.getElementsByTagName('translate')[0].textContent || '',
				type: item.getElementsByTagName('type')[0].textContent || '',
				description: item.getElementsByTagName('useCase')[0].textContent || '',
				variants,
			};
		});

		const parseFilledSchema = arrayOfFilledWordsSchema.safeParse(items);
		const parsedAllKeys = arrayOfHasRequiredKeysXml.safeParse(items);
		console.log('PARSE FILLED SCHEMA: ', parseFilledSchema);
		console.log('PARSED ALL KEYS: ', parsedAllKeys);

		if (!parseFilledSchema.success) {
			setXmlInputError(parseFilledSchema.error.errors[0].message);
			return;
		} else {
			setXmlInputError('');
		}

		if (!parsedAllKeys.success) {
			setXmlInputError(parsedAllKeys.error.errors[0].message);
			return;
		} else {
			setXmlInputError('');
		}

		const merged = [...tableWords, ...items];
		const result = dataWordsArraySchema.safeParse(merged);

		if (!result.success) {
			console.log('Validation error:', result.error.errors);
			setXmlInputError(result.error.errors[0].message);
		} else {
			console.log('Valid data:', result.data);
			setXmlInputError('');
		}

		const uniqueWords = Array.from(
			new Map([...tableWords, ...items].map((word) => [word.name, word])).values(),
		);

		console.log('UNIQUE WORDS: ', uniqueWords);

		setTableWords(uniqueWords);
	};

	const columns = [
		Table.EXPAND_COLUMN,
		{
			title: 'Name',
			dataIndex: 'name',
			key: 'name',
			sorter: (a: DataWords, b: DataWords) => a.name.localeCompare(b.name),
			...getColumnSearchProps('name'),
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
				<FieldGroup
					marginY="03"
					title="Send XML file"
					error={errors?.xmlFile?.message || xmlInputError}
				>
					<Controller
						name="xmlFile"
						control={control}
						render={({ field }) => (
							<Input
								type="file"
								accept=".xml"
								onChange={(e) => {
									handleFileChange(e);
									const file = e.target.files?.[0];
									field.onChange(file);
								}}
								size="middle"
								status={errors?.xmlFile && 'error'}
							/>
						)}
					/>
				</FieldGroup>
				<FieldGroup
					marginY="03"
					title="Send JSON file"
					error={errors?.jsonFile?.message || jsonInputError}
				>
					<Controller
						name="jsonFile"
						control={control}
						render={({ field }) => (
							<Input
								type="file"
								accept=".json"
								onChange={(e) => {
									handleFileChange(e);
									const file = e.target.files?.[0];
									field.onChange(file);
								}}
								size="middle"
								status={errors?.xmlFile && 'error'}
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
			<div className={styles.submitButton}>
				<Button type="primary" shape="round" onClick={onSubmit}>
					Submit
				</Button>
			</div>
		</div>
	);
};
