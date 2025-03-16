import { deleteState, clearAllState } from '@/utils/indexedDB';

const DATA_FIELD = 'vocabulary';

export const deleteVocabularyCollectionProgress = async (
	func: () => void,
	collectionId: string,
) => {
	await deleteState(`${collectionId}_${DATA_FIELD}`);
	func();
};

export const deleteVocabularyAllProgress = async (func: () => void) => {
	await clearAllState();
	func();
};
