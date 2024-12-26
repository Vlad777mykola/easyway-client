import { ReactNode } from 'react';

import { classes } from '@/utils/classes';
import styles from './navbar.module.css';

export type Props = {
	isSticky?: boolean;
	RightSide: ReactNode;
	LeftSide: ReactNode;
};

export const Navbar = ({ isSticky = true, RightSide, LeftSide }: Props) => {
	return (
		<nav
			className={classes(styles.navContainer, {
				[styles.relativeNavContainer]: !isSticky,
				[styles.stickyNavContainer]: isSticky,
			})}
		>
			<div className={styles.navResponsive}>
				{LeftSide}
				{RightSide}
			</div>
		</nav>
	);
};
