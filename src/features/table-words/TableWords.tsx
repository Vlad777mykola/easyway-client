import React, { Dispatch, ComponentType, type SetStateAction, useEffect, useState } from 'react';
import { TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { Button } from '@/ui-components/Button';
import { Table } from '@/ui-components/Table';
import { Input } from '@/ui-components/Input';
import { Space } from '@/ui-components/Space';
import { Icon } from '@/ui-components/Icon';
import { type CreateWordDto } from '@/shared/api/generated/model';
import styles from './tableWords.module.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

type TableWord = {
	key: string;
	name: string;
};

type ModalFormProps = {
	isModalOpen: boolean;
	handleCancel: () => void;
	wordName: string;
	tableWords: CreateWordDto[];
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>;
};

interface Edit {
	name: string;
	transcription?: string;
	translate?: string;
	type?: 'noun' | 'verb' | 'adjective' | 'adverb' | 'other';
	useCase?: string;
	variants?: string[];
}

export const TableWords = <T extends CreateWordDto | TableWord>({
	tableWords,
	isEdit = false,
	ModalForm = () => null,
	setTableWords,
}: {
	tableWords: T[];
	setTableWords: Dispatch<SetStateAction<T[]>>;
	ModalForm?: ComponentType<ModalFormProps>;
	isEdit?: boolean;
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
		...Object.keys(tableWords[0] || [])
			.filter((key) => key !== 'useCase' && key !== 'key')
			.map((key) => {
				const columnObj = {
					title: key,
					dataIndex: key,
					key: key,
				};

				if (key === 'name') {
					return {
						...columnObj,
						sorter: (a: CreateWordDto, b: CreateWordDto) => a.name.localeCompare(b.name),
						...getColumnSearchProps('name'),
					};
				}

				return columnObj;
			}),
		{
			title: 'Action',
			dataIndex: '',
			key: 'action',
			width: '20%',
			align: 'center',
			render: (_: unknown, record: CreateWordDto) => (
				<div>
					{isEdit && (
						<Button type="link" onClick={() => showModal(record)}>
							Edit
						</Button>
					)}
					<Button type="link" onClick={() => deleteWord(record)}>
						Delete
					</Button>
				</div>
			),
		},
	];

	const rowSelection: TableRowSelection<T> = {
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
					setTableWords={setTableWords as Dispatch<SetStateAction<CreateWordDto[]>>}
					handleCancel={handleCancel}
					wordName={editData.name}
					tableWords={tableWords as CreateWordDto[]}
				/>
			)}
			<Table<T>
				className={styles.table}
				size="small"
				rowKey="name"
				expandable={{
					expandedRowRender: (record) =>
						'useCase' in record && <p className={styles.description}>{record.useCase}</p>,
				}}
				dataSource={tableWords}
				columns={columns}
				rowSelection={rowSelection}
			/>
		</div>
	);
};
