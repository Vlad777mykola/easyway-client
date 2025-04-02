import { deleteState, clearAllState } from '@/utils/indexedDB';

export const deleteVocabularyCollectionProgress = async (
	func: () => void,
	collectionId: string,
) => {
	await deleteState(`${collectionId}`);
	func();
};

export const deleteVocabularyAllProgress = async (func: () => void) => {
	await clearAllState();
	func();
};
