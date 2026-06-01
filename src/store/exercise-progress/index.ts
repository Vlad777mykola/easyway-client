export {
	EXERCISE_MODE,
	DEFAULT_DATA_TEST,
	EXERCISE_CONFIG,
	EXERCISE_FORMATE,
} from './useExerciseProgressStore';
export type { ExerciseStoreType, ExerciseType } from './useExerciseProgressStore';

import { createSelectors } from '../createSelectors';
import { useExerciseProgressStoreBase } from './useExerciseProgressStore';

export const useExerciseProgressStore = createSelectors(useExerciseProgressStoreBase);
