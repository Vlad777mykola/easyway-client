import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { getAllVocabularies } from '../../services/getAllVocabularies';
import { useVocabularyStore, VocabularyListType } from '@/store/vocabulary-collection';
// import { Item } from '../../../collections/components/item/Item';
import styles from './vocabularyCollections.module.css';

export const VocabularyCollections = () => {
	const store = useVocabularyStore((store) => store);
	// const filteredCollectionsVocabulary = useVocabularyStore(
	// 	(store) => store.filteredCollectionsVocabulary,
	// );
	const setVocabularyCollections = useVocabularyStore((store) => store.setVocabularyCollections);
	// const navigate = useNavigate();
	console.log('STORE: ', store);

	useEffect(() => {
		const data = getAllVocabularies();
		if (data.length > 0) {
			setVocabularyCollections(data as VocabularyListType[]);
		}
		console.log('DATA: ', data);
	}, []);

	// const onClick = (id: string) => {
	// 	navigate(`/vocabularies/${id}`);
	// };

	return (
		<div className={styles.listContainer}>
			{/* {filteredCollectionsVocabulary.map(
				(i: { title: string; id: string; category: string[]; topic: string[] }) => (
					<Item key={i.id} data={i} onClick={() => onClick(i.id)} />
				),
			)} */}
		</div>
	);
};
