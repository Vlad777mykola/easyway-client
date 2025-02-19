import { getAllVocabularies } from '../../services/getAllVocabularies';

export const VocabularyCollections = () => {
	const data = getAllVocabularies();
	console.log('DATA: ', data);
	return <div>Vocabulary Collections</div>;
};
