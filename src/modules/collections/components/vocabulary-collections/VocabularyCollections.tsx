import { useEffect } from 'react';
import { getAllVocabularies } from '../../services/getAllVocabularies';
import { useVocabularyStore, VocabularyListType } from '@/store/vocabulary-collection';
import styles from './vocabularyCollections.module.css';
import { Item } from '../item/Item';

export const VocabularyCollections = () => {
	const store = useVocabularyStore((store) => store);
	const filteredCollectionsVocabulary = useVocabularyStore(
		(store) => store.filteredCollectionsVocabulary,
	);
	const setVocabularyCollections = useVocabularyStore((store) => store.setVocabularyCollections);
	console.log('STORE: ', store);

	useEffect(() => {
		const data = getAllVocabularies();
		if (data.length > 0) {
			setVocabularyCollections(data as VocabularyListType[]);
		}
		console.log('DATA: ', data);
	}, []);

	return (
		<div className={styles.listContainer}>
			{filteredCollectionsVocabulary.map((i) => (
				<Item key={i.id} data={i} />
			))}
		</div>
	);
};
