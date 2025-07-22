import React, { Dispatch, type SetStateAction, useState } from 'react';
import { TableProps } from 'antd';
import { ColumnType } from 'antd/es/table';
import { TableWord } from '../main/AddCollectionWords';
import type { FilterConfirmProps } from 'antd/es/table/interface';
import { Button } from '@/ui-components/Button';
import { Table } from '@/ui-components/Table';
import { Input } from '@/ui-components/Input';
import { Space } from '@/ui-components/Space';
import { Icon } from '@/ui-components/Icon';
import styles from './tableWords.module.css';

type TableRowSelection<T extends object = object> = TableProps<T>['rowSelection'];

export const TableWords = ({
	tableWords,
	setTableWords,
}: {
	tableWords: TableWord[];
	setTableWords: Dispatch<SetStateAction<TableWord[]>>;
}) => {
	const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
	const [, setSearchText] = useState('');
	const [, setSearchedColumn] = useState<keyof TableWord | ''>('');

	const deleteWord = (record: TableWord) => {
		const filteredWords = tableWords.filter((word) => word.name !== record.name);
		setTableWords(filteredWords);
	};

	const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
		setSelectedRowKeys(newSelectedRowKeys);
	};

	const deleteRows = () => {
		const newRows = tableWords.filter((row) => {
			if (row) {
				return !selectedRowKeys.includes(row.name);
			}
		});
		setTableWords(newRows);
	};

	const handleSearch = (
		selectedKeys: string[],
		confirm: (param?: FilterConfirmProps) => void,
		dataIndex: keyof TableWord,
	) => {
		confirm();
		setSearchText(selectedKeys[0]);
		setSearchedColumn(dataIndex);
	};

	const handleReset = (clearFilters?: () => void) => {
		clearFilters?.();
		setSearchText('');
	};

	const getColumnSearchProps = (dataIndex: keyof TableWord): ColumnType<TableWord> => ({
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
			sorter: (a: TableWord, b: TableWord) => a.name.localeCompare(b.name),
			...getColumnSearchProps('name'),
		},
		{
			title: 'Action',
			dataIndex: '',
			key: 'action',
			width: '20%',
			align: 'center',
			render: (_: unknown, record: TableWord) => (
				<Button type="link" onClick={() => deleteWord(record)}>
					Delete
				</Button>
			),
		},
	];

	const rowSelection: TableRowSelection<TableWord> = {
		selectedRowKeys,
		onChange: onSelectChange,
	};

	return (
		<div className={styles.tableContainer}>
			<div className={styles.deleteButtonContainer}>
				<Button onClick={deleteRows}>Delete</Button>
			</div>
			<Table<TableWord>
				className={styles.table}
				size="small"
				rowKey="name"
				dataSource={tableWords}
				columns={columns}
				rowSelection={rowSelection}
			/>
		</div>
	);
};
