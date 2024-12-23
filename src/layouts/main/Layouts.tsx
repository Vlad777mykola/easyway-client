import { Outlet } from 'react-router-dom';
import Header from '../header/Header';
import { Footer } from '../footer';
import styles from './layouts.module.css';

const Layouts = () => {
	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<Header />
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer className={styles.footer}>
				<Footer />
			</footer>
		</div>
	);
};

export default Layouts;
