export {
	EXERCISE_MODE,
	DEFAULT_DATA_TEST,
	EXERCISE_CONFIG,
	EXERCISE_FORMATE,
} from './useDictionaryStore';
export type { ExerciseStoreType, ExerciseType } from './useDictionaryStore';

import { createSelectors } from '../createSelectors';
import { useDictionaryProgressStoreBase } from './useDictionaryStore';

export const useDictionaryStore = createSelectors(useDictionaryProgressStoreBase);
