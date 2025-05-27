import { ReactNode } from 'react';
import { classes } from '@/ui-design-atoms/classes';
import styles from './wrapper.module.css';

export const Wrapper = ({ children, isSticky }: { children: ReactNode; isSticky?: boolean }) => {
	return (
		<div
			className={classes(styles.wrapper, {
				[styles.sticky]: isSticky,
			})}
		>
			{children}
		</div>
	);
};
