import { ReactNode } from 'react';
import { classes } from '@/shared/services/classes';
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
