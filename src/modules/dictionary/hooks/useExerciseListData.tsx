import { useEffect } from 'react';
import { ExerciseResponseType } from '@/shared/constants/collections/data';
import { getExerciseByCollection } from '@/shared/services/fetch-exercise/getExerciseByCollection';

export const useExerciseListData = (
	func: (exerciseList: ExerciseResponseType[], collectionsId: string) => void,
	collectionsId: string,
	isPause = false,
) => {
	const exercise = getExerciseByCollection(collectionsId);

	useEffect(() => {
		if (exercise && !isPause) {
			func(exercise, collectionsId);
		}
	}, [exercise, collectionsId, isPause, func]);
};
