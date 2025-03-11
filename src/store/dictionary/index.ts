export { EXERCISE_MODE, DEFAULT_DATA_TEST, EXERCISE_CONFIG, EXERCISE_FORMATE } from './constants';

export type { ExerciseType } from './type';
export type { ExerciseStoreType } from './useDictionaryStore';

import { createSelectors } from '../createSelectors';
import { useDictionaryProgressStoreBase } from './useDictionaryStore';

export const useDictionaryStore = createSelectors(useDictionaryProgressStoreBase);
