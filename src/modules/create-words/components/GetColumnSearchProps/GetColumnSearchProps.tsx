/* import type { ColumnType } from 'antd/es/table';
import { DataWords } from '../main/CreateWords';
import { Input } from '@/ui-components/Input';

export const getColumnSearchProps = (dataIndex: DataWords): ColumnType<DataWords> => ({
	filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
		<div style={{ padding: 8 }}>
			<Input
				ref={searchInput}
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
					icon={<SearchOutlined />}
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
		<SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
	),
	onFilter: (value, record) =>
		record[dataIndex]
			?.toString()
			.toLowerCase()
			.includes((value as string).toLowerCase()),
}); */
