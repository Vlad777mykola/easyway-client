import { getWordsByVocabulary } from '@/services/getWordsByVocabulary';
import { Word } from '@/store/vocabulary-collection';
import { useEffect } from 'react';

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
