import { Progress as ProgressAntd } from 'antd';
import type { ProgressProps } from 'antd';

export const Progress = ({ ...props }: ProgressProps) => {
	return <ProgressAntd {...props} />;
};
