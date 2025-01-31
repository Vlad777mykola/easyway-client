import { ReactNode, useMemo } from 'react';
import { ListCollections } from './components/lits-collections/ListCollections';
import { getAllCollections } from './services/getAllCollections';
// import { selectData } from '@/shared/constants/data';
// import { Sidebar } from '../sidebar';
import styles from './collections.module.css';

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);

	return (
		<div className={styles.collectionsContainer}>
			{/* <Sidebar title="Filter" fieldsData={selectData} onSearch={onSearch} /> */}
			<ListCollections data={data} />
		</div>
	);
};
