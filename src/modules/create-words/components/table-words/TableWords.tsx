import React, { Dispatch, type SetStateAction, useEffect, useState } from 'react';
import { TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { Button } from '@/ui-components/Button';
import { Table } from '@/ui-components/Table';
import { Input } from '@/ui-components/Input';
import { Space } from '@/ui-components/Space';
import { Icon } from '@/ui-components/Icon';
import { CreateWordDto } from '@/shared/api/generated/model';
import { ModalForm } from '../modal-form/ModalForm';
import styles from './tableWords.module.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

interface Edit {
	name: string;
	transcription: string;
	translate: string;
	type: 'noun' | 'verb' | 'adjective' | 'adverb' | 'other';
	useCase: string;
	variants: string[];
}

export const TableWords = ({
	tableWords,
	setTableWords,
}: {
	tableWords: CreateWordDto[];
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>;
}) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [, setSearchText] = useState('');
	const [, setSearchedColumn] = useState<keyof CreateWordDto | ''>('');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [editData, setEditData] = useState<Edit>();

	useEffect(() => {
		setIsModalOpen(false);
	}, [tableWords]);

	const showModal = (record: CreateWordDto) => {
		setEditData({ ...record, variants: record.variants.split(', ') });
		setIsModalOpen(true);
	};

	const deleteWord = (record: CreateWordDto) => {
		const filteredWords = tableWords.filter((word) => word.name !== record.name);
		setTableWords(filteredWords);
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const deleteRows = () => {
		const newRows = tableWords.filter((row) => {
			if (row.name) {
				return !selectedRowKeys.includes(row.name);
			}
		});
		setTableWords(newRows);
	};

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: keyof CreateWordDto,
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters?: () => void) => {
		clearFilters?.();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex: keyof CreateWordDto): ColumnType<CreateWordDto> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
			<div style={{ padding: 8 }}>
				<Input
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
			sorter: (a: CreateWordDto, b: CreateWordDto) => a.name.localeCompare(b.name),
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
			render: (_: unknown, record: CreateWordDto) => (
				<div>
					<Button type="link" onClick={() => showModal(record)}>
						Edit
					</Button>
					<Button type="link" onClick={() => deleteWord(record)}>
						Delete
					</Button>
				</div>
			),
		},
	];

	const rowSelection: TableRowSelection<CreateWordDto> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<div className={styles.tableContainer}>
			<div className={styles.deleteButtonContainer}>
				<Button onClick={deleteRows}>Delete</Button>
			</div>
			{editData && (
				<ModalForm
					isModalOpen={isModalOpen}
					setTableWords={setTableWords}
					handleCancel={handleCancel}
					wordName={editData.name}
					tableWords={tableWords}
				/>
			)}
			<Table<CreateWordDto>
				className={styles.table}
				size="small"
				rowKey="name"
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
