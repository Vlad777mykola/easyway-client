export { EXERCISE_MODE, DEFAULT_DATA_TEST } from './useExerciseProgressStore';
export type { ExerciseStoreType, ExerciseType } from './useExerciseProgressStore';

import { createSelectors } from '../createSelectors';
import { useExerciseProgressStoreBase } from './useExerciseProgressStore';

export const useExerciseProgressStore = createSelectors(useExerciseProgressStoreBase);
