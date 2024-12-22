import { Outlet } from 'react-router-dom';
import { Navbar } from '../Navbar';
import { Menu } from '../Menu';
import styles from './layouts.module.css';

const SideMenu = () => {
	return (
		<div>
			<div className={styles.menuItem}>Menu 1</div>
			<div className={styles.menuItem}>Menu 2</div>
			<div className={styles.menuItem}>Menu 3</div>
			<div className={styles.menuItem}>Menu 4</div>
		</div>
	);
};

const Layouts = () => (
	<div className={styles.page}>
		<header className={styles.header}>
			<Navbar
				RightSide={<Menu side="right" Items={<SideMenu />} />}
				LeftSide={<Menu side="left" Items={<SideMenu />} />}
			/>
		</header>
		<main className={styles.main}>
			<Outlet />
		</main>
		<footer className={styles.footer}>Footer Section</footer>
	</div>
);

export default Layouts;
