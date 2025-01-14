import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/ui-components/Icon';
import { Menu } from '@/ui-components/Menu';
// import { useGetUser } from '@/modules/auth/hooks/useGetUser';
import { CircleButton } from '@/ui-components/CircleButton';
import { Navbar } from '@/shared/navbar';
import { NavHeader } from '@/shared/nav-header';
import styles from './header.module.css';

const SideMenu = () => {
	return (
		<div className={styles.headerLeftMenuList}>
			<Link to="/">Home</Link>
			<Link to="/collections">Collections</Link>
			{/* <Link to="/complete-test">Tasks</Link> */}
			{/* <Link to="/test">Create Task</Link> */}
		</div>
	);
};

const Header = () => {
	const navigate = useNavigate();
	// const { data } = useGetUser();
	const data = undefined;

	const handleClick = (link: string) => {
		navigate(link);
	};

	return (
		<div className={styles.headersContainer}>
			<Navbar
				RightSide={
					<>
						{!data && (
							<CircleButton onClick={() => handleClick('/login')}>
								<Icon icon="login" />
							</CircleButton>
						)}
						{data && (
							<div>
								<CircleButton onClick={() => handleClick('/profile')}>
									<Icon icon="user" />
								</CircleButton>
							</div>
						)}
					</>
				}
				LeftSide={<Menu side="left" Items={<SideMenu />} />}
			/>
			<div className={styles.separateLine}></div>
			<NavHeader />
		</div>
	);
};

export default Header;
