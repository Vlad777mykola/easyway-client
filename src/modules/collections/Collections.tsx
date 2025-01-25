import { ReactNode, useMemo } from 'react';
import { ListCollections } from './components/lits-collections/ListCollections';
import { getAllCollections } from './services/getAllCollections';
import { selectData } from '@/shared/constants/data';
import type { SelectValue } from '../sidebar/Sidebar';
import { SidebarMenu } from '../sidebar';
import styles from './collections.module.css';

export const Collections = (): ReactNode => {
	const data = useMemo(() => getAllCollections(), []);

	const onSearch = (data: SelectValue) => {
		console.log('DATA COLLECTIONS SEARCH: ', data);
	};

	const onChange = (data: SelectValue) => {
		console.log('DATA COLLECTIONS CHANGE: ', data);
	};

	return (
		<div className={styles.collectionsContainer}>
			<SidebarMenu title="Filter" selectData={selectData} onSearch={onSearch} onChange={onChange} />
			<ListCollections data={data} />
		</div>
	);
};
