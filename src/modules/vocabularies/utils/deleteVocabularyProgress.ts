import { deleteState, clearAllState } from '@/utils/indexedDB';

const DATA_FIELD = 'vocabulary';

export const deleteVocabularyCollectionProgress = async (
	func: () => void,
	collectionId: string,
) => {
	console.log(`CLEAR 1_VOCABULARY: ${collectionId}_${DATA_FIELD}`);
	await deleteState(`${collectionId}_${DATA_FIELD}`);
	func();
};

export const deleteVocabularyAllProgress = async (func: () => void) => {
	await clearAllState();
	func();
};
