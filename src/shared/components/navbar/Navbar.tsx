import { ReactNode } from 'react';

import styles from './navbar.module.css';

export const Navbar = ({ RightSide, LeftSide }: { RightSide: ReactNode; LeftSide: ReactNode }) => {
	return (
		<nav className={styles.navContainer}>
			<div className={styles.navResponsive}>
				{LeftSide}
				{RightSide}
			</div>
		</nav>
	);
};
