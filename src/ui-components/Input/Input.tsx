import { Input as InputAnt } from 'antd';
import type { InputProps } from 'antd';

export const Input = ({ ...props }: InputProps) => {
	return <InputAnt {...props} />;
};

Input.Search = InputAnt.Search;
