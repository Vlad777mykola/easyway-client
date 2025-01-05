import { ReactNode } from 'react';
import { ListCollections } from './ListCollections';
import { DEFAULT_COLLECTIONS } from '@/constants/data';
import styles from './collections.module.css';

export const Collections = (): ReactNode => {
	return (
		<div className={styles.collectionsContainer}>
			<ListCollections data={DEFAULT_COLLECTIONS} />
		</div>
	);
};
