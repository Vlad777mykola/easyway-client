import { ReactNode, useEffect } from 'react';
import { Item } from '../item/Item';
import styles from './listCollections.module.css';
import { getAllCollections } from '../../services/getAllCollections';
import { useCollectionFilter } from '@/store/collection-filter';
import { useNavigate } from 'react-router-dom';

export const ListCollections = (): ReactNode => {
	const filteredCollectionsData = useCollectionFilter((store) => store.filteredCollectionsData);
	const setCollections = useCollectionFilter((store) => store.setCollections);
	const navigate = useNavigate();

	useEffect(() => {
		const data = getAllCollections();
		if (data.length > 0) {
			setCollections(data);
		}
	}, []);

	const onClick = (id: string) => {
		navigate(`/collections/${id}`);
	};

	return (
		<div className={styles.listContainer}>
			{filteredCollectionsData.map((i) => (
				<Item key={i.id} data={i} onClick={() => onClick(i.id)} />
			))}
		</div>
	);
};
