import { ExerciseResponseType } from '@/shared/constants/collections/data';
import { ALL_DICTIONARY_COLLECTIONS_TASKS_BY_ID } from '@/shared/constants/dictionary';

export const getExerciseByCollection = (id: string): ExerciseResponseType[] | undefined => {
	return ALL_DICTIONARY_COLLECTIONS_TASKS_BY_ID.get(id);
};
