import { ReactNode } from 'react';
import { DEFAULT_TEST } from '@/constants/data';
import styles from './collections.module.css';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/list/List';

export const CollectionDetails = (): ReactNode => {
	const params = useParams();

	return (
		<div className={styles.collectionsContainer}>
			<div>Collections {params.collectionsId}</div>
			<List data={DEFAULT_TEST} />
		</div>
	);
};
