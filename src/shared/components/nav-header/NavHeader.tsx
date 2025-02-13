import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbItemType, BreadcrumbSeparatorType } from 'antd/es/breadcrumb/Breadcrumb';
import { Breadcrumb } from '@/ui-components/Breadcrumb';
import styles from './navHeader.module.css';

type LinkType = {
	href: string;
	title: string;
};

export const NavHeader = () => {
	const [depthRoute, setDepthRoute] = useState<LinkType[]>([]);
	const location = useLocation();

	const makeDepthRouterLocation = (url: string): LinkType[] => {
		const urlArray = url.split('/').filter(Boolean);
		const res: LinkType[] = [{ href: '/', title: 'Home' }];
		let link = '/';

		urlArray.forEach((item, index) => {
			if (item === 'task') {
				link += item + '/';
			} else {
				link += item + '/';
				res.push({
					href: link,
					title:
						urlArray[index - 1] === 'collections'
							? 'collection'
							: urlArray[index - 1] === 'task'
								? 'task'
								: item,
				});
			}
		});

		return res.slice(0, -1);
	};

	useEffect(() => {
		setDepthRoute(makeDepthRouterLocation(location.pathname));
	}, [location.pathname]);

	const itemRender = (currentRoute: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>) => {
		return <Link to={currentRoute.href || ''}>{currentRoute.title}</Link>;
	};

	return (
		<div className={styles.routeDepthContainer}>
			<Breadcrumb itemRender={itemRender} items={[...depthRoute]} />
		</div>
	);
};
