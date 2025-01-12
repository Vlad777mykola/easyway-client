import { Breadcrumb as BreadcrumbAnt } from 'antd';
import type { BreadcrumbProps } from 'antd';

export const Breadcrumb = ({ ...props }: BreadcrumbProps) => {
	return <BreadcrumbAnt {...props} />;
};
