import { ReactNode } from 'react';
import { Filter } from '../filter';
import { ListCollections } from './ListCollections';
import { DEFAULT_COLLECTIONS, selectData } from '@/shared/constants/data';
import styles from './collections.module.css';

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
