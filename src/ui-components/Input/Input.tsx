import { Input as InputAnt } from 'antd';
import type { InputProps } from 'antd';

const Input = ({ ...props }: InputProps) => {
	return <InputAnt {...props} />;
};

export default Input;
