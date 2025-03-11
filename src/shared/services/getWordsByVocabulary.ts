import { ALL_VOCABULARIES_BY_ID } from '@/shared/constants/data';
import { Word } from '@/store/vocabulary-collection';

export const getWordsByVocabulary = (id: string): Word[] | undefined => {
	return ALL_VOCABULARIES_BY_ID.get(id);
};
