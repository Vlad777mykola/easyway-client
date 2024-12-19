import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar';
import styles from './layouts.module.css';

const Layouts = () => (
	<div className={styles.page}>
		<header className={styles.header}>
			<Navbar RightSide={<div>Menu</div>} LeftSide={<div>Menu</div>} />
		</header>
		<main className={styles.main}>
			<Outlet />
		</main>
		<footer className={styles.footer}>Footer Section</footer>
	</div>
);

export default Layouts;
