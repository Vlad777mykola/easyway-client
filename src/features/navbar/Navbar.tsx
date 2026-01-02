import { ReactNode, FC } from 'react';

import styles from './navbar.module.css';

export const Navbar: FC<{ rightSide?: ReactNode; leftSide: ReactNode }> = ({
	rightSide,
	leftSide,
}) => {
	return (
		<nav className={styles.navContainer}>
			<div className={styles.navResponsive}>
				{leftSide && leftSide}
				{rightSide && rightSide}
			</div>
		</nav>
	);
};
