import { ReactNode } from 'react';
import { Typography } from '../Typography';
import { classes } from '@/ui-design-atoms/classes';
import { margin, MarginProps } from '@/ui-design-atoms/margin';

export const FieldGroup = ({
	children,
	title,
	error,
	...props
}: {
	children: ReactNode;
	title?: string;
	error?: string;
} & MarginProps) => {
	return (
		<div className={classes(margin(props))}>
			{title && <Typography.Title level={5}>{title}</Typography.Title>}
			{children}
			{error && <Typography.Text type="danger">{error}</Typography.Text>}
		</div>
	);
};
