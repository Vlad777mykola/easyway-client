import { ReactNode, useEffect, useMemo, useState } from 'react';
import { Filter } from '../filter';
import { ListCollections } from './components/lits-collections/ListCollections';
import { getAllCollections } from './services/getAllCollections';
import { selectData } from '@/shared/constants/data';
import styles from './collections.module.css';
import { Menu } from '@/ui-components/Menu';

const DESKTOP_SCREEN_WIDTH = 1201;

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);

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
				<ListCollections data={data} />
			</div>
		</div>
	);
};
