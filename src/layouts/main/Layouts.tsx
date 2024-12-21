import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { LoginOutlined, UserOutlined } from '@ant-design/icons';
import { useGetUser } from '@/modules/auth/hooks/useGetUser';
import { CircleButton } from '@/ui-components/CircleButton';
import { Navbar } from '../navbar';
import styles from './layouts.module.css';

const Layouts = () => {
	const navigate = useNavigate();
	const { data } = useGetUser();

	console.log('DATA: ', data);

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
								<LoginOutlined />
							</CircleButton>
						) : (
							<CircleButton onClick={() => handleClick('/profile')}>
								<UserOutlined />
							</CircleButton>
						)
					}
					LeftSide={<div>Menu</div>}
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
