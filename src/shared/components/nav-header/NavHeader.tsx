import { ReactNode, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumb } from '@/ui-components/Breadcrumb';
import styles from './navHeader.module.css';

type LinkType = {
	href: string;
	title: ReactNode;
};

export const NavHeader = () => {
	const [depthRoute, setDepthRoute] = useState<LinkType[]>([]);
	const location = useLocation();

	const makeDepthRouterLocation = (url: string) => {
		const urlArrayWithoutSlash = ['/'];
		const urlArray = url.split('/');
		for (let i = 0; i < urlArray.length; i++) {
			if (urlArray[i] !== '') {
				urlArrayWithoutSlash.push(urlArray[i]);
			}
		}
		let res: LinkType[] = [];
		let link = '';
		for (let i = 0; i < urlArrayWithoutSlash.length; i++) {
			if (urlArrayWithoutSlash[i] === '/') {
				link += '/';
				res = [
					...res,
					{
						href: '/',
						title: <Link to="/">Home</Link>,
					},
				];
			} else if (!isNaN(Number(urlArrayWithoutSlash[i]))) {
				link += urlArrayWithoutSlash[i] + '/';
				res = [
					...res,
					{
						href: link,
						title: <Link to={link}>{urlArrayWithoutSlash[i]}</Link>,
					},
				];
			} else if (urlArrayWithoutSlash[i] === 'task') {
				link += urlArrayWithoutSlash[i] + '/';
			} else {
				link += urlArrayWithoutSlash[i] + '/';
				res = [
					...res,
					{
						href: link,
						title: <Link to={link}>{urlArrayWithoutSlash[i]}</Link>,
					},
				];
			}
		}
		return res;
	};

	useEffect(() => {
		setDepthRoute(makeDepthRouterLocation(location.pathname));
	}, [location.pathname]);

	return (
		<div className={styles.routeDepthContainer}>
			<Breadcrumb items={[...depthRoute]} />
		</div>
	);
};
