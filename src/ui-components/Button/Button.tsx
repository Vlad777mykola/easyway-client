import { Button as ButtonAnt } from 'antd';
import type { ButtonProps } from 'antd';

export const Button = ({ ...props }: ButtonProps) => {
	return <ButtonAnt {...props}>{props.children}</ButtonAnt>;
};
