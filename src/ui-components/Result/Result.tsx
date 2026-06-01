import { Result as ResultAnt } from 'antd';
import type { ResultProps } from 'antd';

export const Result = ({ ...props }: ResultProps) => {
	return <ResultAnt {...props} />;
};
