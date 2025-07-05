import { Modal as ModalAnt } from 'antd';
import type { ModalProps } from 'antd';

export const Modal = ({ ...props }: ModalProps) => {
	return <ModalAnt {...props}>{props.children}</ModalAnt>;
};
