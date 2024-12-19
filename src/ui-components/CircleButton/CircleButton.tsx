import { ImgHTMLAttributes } from 'react';
import { ButtonProps } from 'antd';
import { Button } from '../Button';

type Props = {
	children: Pick<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'alt'>;
} & ButtonProps;

export const CircleButton = ({ children, ...props }: Props) => {
	return (
		<Button {...props} shape="circle">
			{children}
		</Button>
	);
};
