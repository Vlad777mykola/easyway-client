import {
	ALL_COLLECTIONS_TASKS_BY_ID,
	ExerciseResponseType,
} from '@/shared/constants/collections/data';

export const getExerciseByCollection = (id: string): ExerciseResponseType[] | undefined => {
	return ALL_COLLECTIONS_TASKS_BY_ID.get(id);
};
