import { useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { Random } from './random/Random';
import { Infinitive } from './infinitive/Infinitive';
import { Exam } from './exam/Exam';
import { STEP } from './constants/constants';
import { swapQuestion } from './utils/swapQuestion';
import { EXERCISE_MODE } from '@/store/exercise-progress';

export type BaseFieldsDataType = {
	ids: string[];
	currentId: string;
	navigateTo: (id: string) => void;
	isAutoNavigate: boolean;
};

export type RandomModeType = BaseFieldsDataType & {
	totalCount: number;
	filledCount: number;
	exerciseMode: typeof EXERCISE_MODE.isRandom;
};

export type ExamModeType = BaseFieldsDataType & {
	exerciseMode: typeof EXERCISE_MODE.isExam;
};

export type InfinitiveModeType = BaseFieldsDataType & {
	exerciseMode: typeof EXERCISE_MODE.isInfinitive;
};

export const Pagination = (props: InfinitiveModeType | RandomModeType | ExamModeType) => {
	const { ids, navigateTo, currentId, isAutoNavigate, exerciseMode } = props;
	const debouncedAutoNavigate = useDebounce(isAutoNavigate, 1000);
	const currentIndex: number = ids.findIndex((id) => id === currentId);

	useEffect(() => {
		if (debouncedAutoNavigate) {
			swapQuestion(STEP.NEXT, currentIndex, ids, navigateTo);
		}
	}, [debouncedAutoNavigate, currentIndex, ids, navigateTo]);

	switch (exerciseMode) {
		case EXERCISE_MODE.isRandom:
			return <Random {...props} />;
		case EXERCISE_MODE.isExam:
			return <Exam {...props} />;
		case EXERCISE_MODE.isInfinitive:
			return <Infinitive {...props} />;
		default:
			return null;
	}
};
