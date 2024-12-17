import { ReactNode } from 'react';
import { classes } from '../../common_utils/classes/classes.tsx';
import styles from './Navbar.module.css';

export type Props = {
	isSticky?: boolean;
	RightSide: ReactNode;
	LeftSide: ReactNode;
};

const Navbar = ({ isSticky = false, RightSide = <>Hi</>, LeftSide = <>Hi</> }: Props) => {
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

export default Navbar;
