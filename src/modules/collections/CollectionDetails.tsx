import { ReactNode } from 'react';
import { DEFAULT_TEST, DEFAULT_TEST_2 } from '@/shared/constants/data';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/components/list/List';
import styles from './collectionDetails.module.css';

export const CollectionDetails = (): ReactNode => {
	const { collectionsId } = useParams();

	return (
		<div className={styles.collectionsContainer}>
			<div>Collections {collectionsId}</div>
			<List data={collectionsId == '1' ? DEFAULT_TEST : DEFAULT_TEST_2} />
		</div>
	);
};
