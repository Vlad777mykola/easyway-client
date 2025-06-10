import { Alert as AlertAnt } from 'antd';
import type { AlertProps } from 'antd';

export const Alert = ({ ...props }: AlertProps) => {
	return <AlertAnt {...props} />;
};
