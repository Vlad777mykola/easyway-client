import { Table as TableAnt } from 'antd';
import type { TableProps } from 'antd';

export const Table = <T,>({ ...props }: TableProps<T>) => {
	return <TableAnt {...props} />;
};

Table.EXPAND_COLUMN = TableAnt.EXPAND_COLUMN;
Table.SELECTION_ALL = TableAnt.SELECTION_ALL;
Table.SELECTION_INVERT = TableAnt.SELECTION_INVERT;
Table.SELECTION_NONE = TableAnt.SELECTION_NONE;
