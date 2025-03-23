import { ExerciseType } from '@/store/vocabulary-collection';
import { Dispatch, SetStateAction } from 'react';

export type FormateType = {
	task: ExerciseType;
	isSelectingFormate: boolean;
	isAutoPlay: boolean;
	setTask: Dispatch<SetStateAction<ExerciseType>>;
	setIsAutoNavigate: Dispatch<SetStateAction<boolean>>;
	updateProgress: (id: string, isCorrectWord: boolean) => void;
};
