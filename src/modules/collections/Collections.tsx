import { ReactNode, useEffect, useState } from 'react';
import { Filter } from '../filter';
import { ListCollections } from './ListCollections';
import { Menu } from '@/ui-components/Menu';
import { DEFAULT_COLLECTIONS, selectData } from '@/shared/constants/data';
import styles from './collections.module.css';

const DESKTOP_SCREEN_WIDTH = 1201;

export const Collections = (): ReactNode => {
	const [screenWidth, setScreenWidth] = useState(window.innerWidth);

	useEffect(() => {
		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleResize = () => {
		setScreenWidth(window.innerWidth);
	};

	return (
		<div className={styles.collections}>
			{screenWidth <= DESKTOP_SCREEN_WIDTH && (
				<div className={styles.filterMenu}>
					<Menu
						icon="filter"
						side="left"
						Items={<Filter title="Filter" selectData={[...selectData]} />}
					/>
				</div>
			)}
			<div className={styles.collectionsContainer}>
				{screenWidth >= DESKTOP_SCREEN_WIDTH && (
					<div className={styles.filter}>
						<Filter title="Filter" selectData={[...selectData]} />
					</div>
				)}
				<ListCollections data={DEFAULT_COLLECTIONS} />
			</div>
		</div>
	);
};
