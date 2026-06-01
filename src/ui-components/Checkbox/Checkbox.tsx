import { Checkbox as CheckboxAnt } from 'antd';
import type { CheckboxProps } from 'antd';

export const Checkbox = ({ ...props }: CheckboxProps) => {
	return <CheckboxAnt {...props} />;
};
