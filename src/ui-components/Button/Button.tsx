import { Button as ButtonAnt } from 'antd';
import type { ButtonProps } from 'antd';

const Button = ({ ...props }: ButtonProps) => {
	return <ButtonAnt {...props}>{props.children}</ButtonAnt>;
};

export default Button;
