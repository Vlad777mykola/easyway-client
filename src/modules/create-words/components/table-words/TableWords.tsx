import React, { useEffect, useState } from 'react';
import { Control, FieldErrors, UseFormHandleSubmit, UseFormSetValue } from 'react-hook-form';
import { TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { Button } from '@/ui-components/Button';
import { Table } from '@/ui-components/Table';
import { Input } from '@/ui-components/Input';
import { Space } from '@/ui-components/Space';
import { Icon } from '@/ui-components/Icon';
import { Modal } from '@/ui-components/Modal';
import { Typography } from '@/ui-components/Typography';
import { AddWordForm } from '../add-word-form/AddWordForm';
import { DataWords } from '../main/CreateWords';
import { FormValues } from '../../types';
import styles from './tableWords.module.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

export const TableWords = ({
	tableWords,
	editWordForm,
	setTableWords,
}: {
	tableWords: DataWords[];
	editWordForm: {
		errors: FieldErrors<FormValues>;
		control: Control<FormValues>;
		error: Error | null;
		isPending: boolean;
		clearEditErrors: () => void;
		setValue: UseFormSetValue<FormValues>;
		clearForm: () => void;
		addWord: (data: FormValues) => void;
		handleAdd: () => void;
		handleSubmit: UseFormHandleSubmit<FormValues>;
	};
	setTableWords: React.Dispatch<React.SetStateAction<DataWords[]>>;
}) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [, setSearchText] = useState('');
	const [, setSearchedColumn] = useState<keyof DataWords | ''>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState({});

	useEffect(() => {
		setIsModalOpen(false);
	}, [tableWords]);

	useEffect(() => {
		if (fillForm) {
			fillForm();
			editWordForm.clearEditErrors();
		}
	}, [editData]);

	const showModal = (record: DataWords) => {
		setEditData({ ...record, variants: record.variants.split(', ') });
		setIsModalOpen(true);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const deleteRows = () => {
		const newRows = tableWords.filter((row) => {
			if (row.key) {
				return !selectedRowKeys.includes(row.key);
			}
		});
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
				.includes((value as string).toLowerCase()) || false,
	});

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
		{
			title: 'Action',
			dataIndex: '',
			key: 'action',
			render: (_: unknown, record: DataWords) => (
				<Button type="link" onClick={() => showModal(record)}>
					Edit
				</Button>
			),
		},
	];

	const rowSelection: TableRowSelection<DataWords> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	const fillForm = () => {
		Object.entries(editData).forEach(([key, value]) => {
			editWordForm.setValue(key as keyof FormValues, value as string | string[]);
		});
	};

	return (
		<div className={styles.tableContainer}>
			<div className={styles.deleteButtonContainer}>
				<Button onClick={deleteRows}>Delete</Button>
			</div>
			<Modal
				title={
					<Typography.Title className={styles.titleModal} level={2}>
						Edit Word
					</Typography.Title>
				}
				closable={{ 'aria-label': 'Custom Close Button' }}
				open={isModalOpen}
				onCancel={handleCancel}
				footer={null}
				mask={false}
			>
				<AddWordForm createWordForm={editWordForm} isModal={true} />
			</Modal>
			<Table<DataWords>
				className={styles.table}
				size="small"
				expandable={{
					expandedRowRender: (record) => <p className={styles.description}>{record.useCase}</p>,
				}}
				dataSource={tableWords}
				columns={columns}
				rowSelection={rowSelection}
			/>
		</div>
	);
};
