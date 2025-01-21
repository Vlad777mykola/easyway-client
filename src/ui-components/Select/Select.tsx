import { Select as SelectAnt } from 'antd';
import type { SelectProps } from 'antd';

export const Select = ({ ...props }: SelectProps) => {
	return <SelectAnt {...props} />;
};
