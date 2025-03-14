import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCollectionFilter } from '@/store/collection-filter';

import { Item } from '../item/Item';
import styles from './listCollections.module.css';
import { useCollectionsData } from '@/shared/services/fetch-collections';
import { CollectionsType } from '@/shared/constants';

export const ListCollections = ({ collectionId }: { collectionId: CollectionsType }): ReactNode => {
	const navigate = useNavigate();
	const setCollections = useCollectionFilter.use.setCollections();
	const collectionsData = useCollectionFilter.use.collectionsData();
	const filteredCollectionsData = useCollectionFilter.use.filteredCollectionsData();
	const data = filteredCollectionsData.length > 0 ? filteredCollectionsData : collectionsData;

	useCollectionsData(setCollections, collectionId);

	const onClick = (id: string) => {
		navigate(`/${collectionId}/${id}`);
	};

	return (
		<div className={styles.listContainer}>
			{data.map(
				(i: { title: string; id: string; category: string[]; topic: string[] | string }) => (
					<Item data={i} onClick={() => onClick(i.id)} />
				),
			)}
		</div>
	);
};
