export {
	VOCABULARY_TOPICS,
	VOCABULARY_CATEGORIES,
	LEVEL_BASED,
	VOCABULARY_CONFIG,
	WORD_CONFIG,
	EXERCISE_MODE,
} from './constants';

export type { VocabularyListType, VocabularyConfigType, Word, ExerciseType } from './type';

import { createSelectors } from '../createSelectors';
import { useVocabularyStoreBase } from './useVocabularyStore';

export const useVocabularyStore = createSelectors(useVocabularyStoreBase);
