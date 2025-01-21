import { ReactNode, useMemo } from 'react';
import { ListCollections } from './components/lits-colections/ListCollections';
import { getAllCollections } from './services/getAllCollections';

import styles from './collections.module.css';

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);

	return (
		<div className={styles.collectionsContainer}>
			<ListCollections data={data} />
		</div>
	);
};
