import { ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Item } from '../item/Item';
import { getAllCollections } from '../../services/getAllCollections';
import { useCollectionFilter } from '@/store/collection-filter';
import styles from './listCollections.module.css';

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
