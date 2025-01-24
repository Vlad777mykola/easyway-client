import { ReactNode, useContext, useMemo } from 'react';
import { Filter } from '../filter';
import { Menu } from '@/ui-components/Menu';
import { ListCollections } from './components/lits-collections/ListCollections';
import { getAllCollections } from './services/getAllCollections';
import { selectData } from '@/shared/constants/data';
import styles from './collections.module.css';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);
	const { isMobile, isLaptop, isDesktop } = useContext(ScreenSizeContext);

	return (
		<div className={styles.collections}>
			{(isMobile || isLaptop) && (
				<div className={styles.filterMenu}>
					<Menu
						icon="filter"
						side="left"
						Items={<Filter title="Filter" selectData={[...selectData]} />}
					/>
				</div>
			)}
			<div className={styles.collectionsContainer}>
				{isDesktop && (
					<div className={styles.filter}>
						<Filter title="Filter" selectData={[...selectData]} />
					</div>
				)}
				<ListCollections data={data} />
			</div>
		</div>
	);
};
