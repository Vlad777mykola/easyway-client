export {
	VOCABULARY_TOPICS,
	VOCABULARY_CATEGORIES,
	LEVEL_BASED,
	VOCABULARY_CONFIG,
} from './useVocabularyStore';

import { createSelectors } from '../createSelectors';
import { useVocabularyStoreBase } from './useVocabularyStore';

export const useVocabularyStore = createSelectors(useVocabularyStoreBase);
