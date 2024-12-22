import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useGetUser } from '@/modules/auth/hooks/useGetUser';
import { CircleButton } from '@/ui-components/CircleButton';
import { Navbar } from '../Navbar';
import { Menu } from '../Menu';
import styles from './layouts.module.css';
import { Icon } from '@/ui-components/Icon';

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

const Layouts = () => {
	const navigate = useNavigate();
	const { data } = useGetUser();

	const handleClick = (link: string) => {
		navigate(link);
	};

	return (
		<div className={styles.page}>
			<header className={styles.header}>
				<Navbar
					RightSide={
						data === undefined ? (
							<CircleButton onClick={() => handleClick('/login')}>
								<Icon icon="login" />
							</CircleButton>
						) : (
							<CircleButton onClick={() => handleClick('/profile')}>
								<Icon icon="user" />
							</CircleButton>
						)
					}
					LeftSide={<Menu side="left" Items={<SideMenu />} />}
				/>
			</header>
			<main className={styles.main}>
				<Outlet />
			</main>
			<footer className={styles.footer}>Footer Section</footer>
		</div>
	);
};

export default Layouts;
