import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../ui-components/Button/Button.tsx';
import { classes } from '../../common_utils/classes/classes.tsx';
import styles from './Navbar.module.css';

interface NavbarItem {
	href: string;
	children: ReactNode | string;
	isModal: boolean;
}

export type Props = {
	isSticky?: boolean;
	rightItems?: NavbarItem[];
	leftItems?: NavbarItem[];
};

const Navbar = ({ isSticky = false, rightItems = [], leftItems = [] }: Props) => {
	const navigate = useNavigate();

	const handleClick = (link: string) => {
		navigate(link);
	};

	return (
		<nav
			className={classes(styles.navContainer, {
				[styles.relativeNavContainer]: !isSticky,
				[styles.stickyNavContainer]: isSticky,
			})}
		>
			<div className={styles.navResponsive}>
				<div className={styles.rightSide}>
					{leftItems.length > 0 && (
						<div className={styles.nav}>
							{leftItems.map((item) => (
								<li key={item.href} className={styles.navItem}>
									<Button
										type="link"
										onClick={() => {
											handleClick(item.href);
										}}
									>
										{item.children}
									</Button>
								</li>
							))}
						</div>
					)}
				</div>
				<ul className={styles.nav}>
					{rightItems.map((rightItem) => (
						<li key={rightItem.href} className={styles.navItem}>
							<Button
								type="link"
								onClick={() => {
									handleClick(rightItem.href);
								}}
							>
								{rightItem.children}
							</Button>
						</li>
					))}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;
