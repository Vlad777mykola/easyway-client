import { useEffect } from 'react';
import { getWordsByVocabulary } from '@/shared/services/getWordsByVocabulary';
import { Word } from '@/store/vocabulary-collection';

export const useVocabularyListData = (
	func: (wordsList: Word[], vocabulariesId: string) => void,
	vocabulariesId: string,
) => {
	const words = getWordsByVocabulary(vocabulariesId);

	useEffect(() => {
		if (words) {
			func(words, vocabulariesId);
		}
	}, []);
};
