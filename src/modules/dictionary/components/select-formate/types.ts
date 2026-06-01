import { ExerciseType } from '@/store/dictionary';
import { Dispatch, SetStateAction } from 'react';

export type FormateType = {
	task: ExerciseType;
	isSelectingFormate: boolean;
	setTask: Dispatch<SetStateAction<ExerciseType>>;
	setIsAutoNavigate: Dispatch<SetStateAction<boolean>>;
	updateProgress: (id: string, isCorrectWord: boolean) => void;
};
