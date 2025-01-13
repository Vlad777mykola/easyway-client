import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@/ui-components/Icon';
import { Menu } from '@/ui-components/Menu';
import { useGetUser } from '@/modules/auth/hooks/useGetUser';
import { CircleButton } from '@/ui-components/CircleButton';
import { Navbar } from '@/shared/navbar';
import styles from './header.module.css';
import { Breadcrumb } from '@/ui-components/Breadcrumb';
import { useEffect, useState } from 'react';

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

type LinkType = {
	href: string;
	title: string;
};

const Header = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { data } = useGetUser();
	const [depthRoute, setDepthRoute] = useState<LinkType[]>([]);

	const handleClick = (link: string) => {
		navigate(link);
	};

	const makeDepthRouterLocation = (url: string) => {
		const urlArray = [...new Set(url.replace(/\/task.*$/, '').split('/'))];
		let res: LinkType[] = [];
		let link = '';
		for (let i = 0; i < urlArray.length; i++) {
			if (urlArray[i] === '') {
				link += '/';
				res = [
					...res,
					{
						href: '/',
						title: 'Home',
					},
				];
			} else if (!isNaN(Number(urlArray[i]))) {
				link += urlArray[i] + '/';
				res = [
					...res,
					{
						href: `${link}task/${urlArray[i]}`,
						title: urlArray[i],
					},
				];
			} else {
				link += urlArray[i] + '/';
				res = [
					...res,
					{
						href: link,
						title: urlArray[i],
					},
				];
			}
		}
		console.log('RES: ', res);
		return res;
	};

	useEffect(() => {
		setDepthRoute(makeDepthRouterLocation(location.pathname));
	}, [location.pathname]);

	console.log('DEPTH ROUTE: ', depthRoute);
	console.log('LOCATION PATHNAME: ', location.pathname);

	return (
		<div className={styles.headersContainer}>
			<Navbar
				RightSide={
					data === undefined ? (
						<CircleButton onClick={() => handleClick('/login')}>
							<Icon icon="login" />
						</CircleButton>
					) : (
						<div>
							<CircleButton onClick={() => handleClick('/profile')}>
								<Icon icon="user" />
							</CircleButton>
						</div>
					)
				}
				LeftSide={<Menu side="left" Items={<SideMenu />} />}
			/>
			<div className={styles.separateLine}></div>
			<div className={styles.routeDepthContainer}>
				<Breadcrumb items={[...depthRoute]} />
			</div>
		</div>
	);
};

export default Header;
