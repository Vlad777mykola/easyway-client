import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { CollectionsType } from '@/shared/constants';
import { useCollectionFilter } from '@/store/collection-filter';
// import { useCollectionsData } from '@/shared/services/fetch-collections';

import { Item } from '../item/Item';
import styles from './listCollections.module.css';
import { getAllCollections } from '@/shared/services/fetch-collections/getCollectionsData';

export const ListCollections = ({
	collectionId,
	isLocal,
}: {
	collectionId: CollectionsType;
	isLocal: boolean;
}): ReactNode => {
	const navigate = useNavigate();
	// const setCollections = useCollectionFilter.use.setCollections();
	const collectionsData = useCollectionFilter.use.collectionsData();
	const filteredCollectionsData = useCollectionFilter.use.filteredCollectionsData();
	const data = filteredCollectionsData.length > 0 ? filteredCollectionsData : collectionsData;

	// useCollectionsData(setCollections, collectionId);

	const localCollections = isLocal && getAllCollections(collectionId);

	console.log('COLLECTIONS: ', localCollections);
	console.log('DATA: ', data);

	const onClick = (id: string) => {
		navigate(`/${collectionId}/${id}`);
	};

	return (
		<div className={styles.listContainer}>
			{(localCollections || data).map(
				(i: { title: string; id: string; category: string[]; topic: string[] }) => (
					<Item key={i.id} data={i} onClick={() => onClick(i.id)} />
				),
			)}
		</div>
	);
};
