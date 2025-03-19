import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllVocabularies } from '../../services/getAllVocabularies';
import { useVocabularyStore, VocabularyListType } from '@/store/vocabulary-collection';
import { Item } from '@/modules/vocabularies/components/item/Item';
import styles from './vocabularyCollections.module.css';

export const VocabularyCollections = () => {
	const filteredCollectionsVocabulary = useVocabularyStore(
		(store) => store.filteredCollectionsVocabulary,
	);
	const setVocabularyCollections = useVocabularyStore.use.setVocabularyCollections();
	const navigate = useNavigate();

	useEffect(() => {
		const data = getAllVocabularies();
		if (data.length > 0) {
			setVocabularyCollections(data as VocabularyListType[]);
		}
	}, []);

	const onClick = (id: string) => {
		navigate(`/vocabularies/${id}`);
	};

	return (
		<div className={styles.listContainer}>
			{filteredCollectionsVocabulary.map(
				(i: { title: string; id: string; category: string[]; topic: string[] }) => (
					<Item key={i.id} data={i} onClick={() => onClick(i.id)} />
				),
			)}
		</div>
	);
};
