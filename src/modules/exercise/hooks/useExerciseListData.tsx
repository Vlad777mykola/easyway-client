import { useEffect } from 'react';
import { ExerciseResponseType } from '@/shared/constants/data';
import { getExerciseByCollection } from '@/services/getExerciseByCollection';

export const useExerciseListData = (
	func: (exerciseList: ExerciseResponseType[]) => void,
	collectionsId: string,
) => {
	const exercise = getExerciseByCollection(collectionsId);

	useEffect(() => {
		if (exercise) {
			func(exercise);
		}
	}, [exercise]);
};
