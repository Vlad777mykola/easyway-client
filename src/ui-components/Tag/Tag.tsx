import { Tag as TagAnt } from 'antd';
import type { TagProps } from 'antd';

export const Tag = ({ ...props }: TagProps) => {
	return <TagAnt {...props} />;
};
