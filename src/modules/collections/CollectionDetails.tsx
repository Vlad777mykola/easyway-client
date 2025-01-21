import { ReactNode, useMemo } from 'react';
import styles from './collections.module.css';
import { useParams } from 'react-router-dom';
import { List } from '@/shared/components/list/List';
import { getCollectionById } from './services/getCollectionById';

export const CollectionDetails = (): ReactNode => {
	const { collectionsId } = useParams();
	const data = useMemo(() => getCollectionById(collectionsId || ''), [collectionsId]);

	return (
		<div className={styles.collectionsContainer}>
			<div>Collections {collectionsId}</div>
			{data && <List data={data} />}
		</div>
	);
};
