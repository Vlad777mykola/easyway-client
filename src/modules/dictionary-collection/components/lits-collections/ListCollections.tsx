import { ReactNode, useEffect } from 'react';
import { Item } from '../item/Item';
import styles from './listCollections.module.css';
import { getAllCollections } from '../../services/getAllCollections';
import { useCollectionFilter } from '@/store/collection-filter';

export const ListCollections = (): ReactNode => {
	const filteredCollectionsData = useCollectionFilter((store) => store.filteredCollectionsData);
	const setCollections = useCollectionFilter((store) => store.setCollections);

	useEffect(() => {
		const data = getAllCollections();
		if (data.length > 0) {
			setCollections(data);
		}
	}, []);

	return (
		<div className={styles.listContainer}>
			{filteredCollectionsData.map((i) => (
				<Item key={i.id} data={i} />
			))}
		</div>
	);
};
