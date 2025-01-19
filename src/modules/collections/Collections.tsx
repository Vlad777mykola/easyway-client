import { ReactNode } from 'react';
import { ListCollections } from './ListCollections';
import { DEFAULT_COLLECTIONS, selectData } from '@/shared/constants/data';
import styles from './collections.module.css';
import { Filter } from '../filter/Filter';

export const Collections = (): ReactNode => {
	return (
		<div className={styles.collectionsContainer}>
			<div className={styles.filter}>
				<Filter selectData={[...selectData]} />
			</div>
			<ListCollections data={DEFAULT_COLLECTIONS} />
		</div>
	);
};
