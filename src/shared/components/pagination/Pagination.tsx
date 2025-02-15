import { memo, useEffect } from 'react';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { getRandomInteger } from '@/shared/utils/get-random-integer';
import { Progress } from '@/shared/components/progress';
import { useDebounce } from '@/shared/hooks/use-debounce';

import styles from './pagination.module.css';
import { Random } from './Random/Random';
import { Infinitive } from './Infinitive/Infinitive';
import { Exam } from './Exam/Exam';

export type BaseFieldsDataType = {
	ids: string[];
	currentId: string;
	navigateTo: (id: string) => void;
	isAutoNavigate: boolean;
};

export type RandomModeType = BaseFieldsDataType & {
	totalCount: number;
	filledCount: number;
	exerciseMode: 'randomMode';
};

export type ExamModeType = BaseFieldsDataType & {
	mode: number;
	exerciseMode: 'examMode';
};

export type InfinitiveModeType = BaseFieldsDataType & {
	exerciseMode: 'infinitiveMode';
};

export const Pagination = (props: ExamModeType | RandomModeType | InfinitiveModeType) => {
	// const debouncedAutoNavigate = useDebounce(isAutoNavigate, 1000);
	// const { isRandom, isExam } = exerciseMode;
	// const currentIndex: number = ids.findIndex((id) => id === currentId);

	// console.log('EXERCISE MODE: ', exerciseMode);

	// useEffect(() => {
	// 	if (debouncedAutoNavigate) {
	// 		swapQuestion(STEP.NEXT);
	// 	}
	// }, [debouncedAutoNavigate]);

	// const swapQuestion = (move: string) => {
	// 	if (isRandom) {
	// 		const moveIndex = getRandomInteger(currentIndex, ids.length - 1);
	// 		navigateTo(ids[moveIndex]);
	// 		return;
	// 	}

	// 	const lastIndex = currentIndex === ids.length - 1;
	// 	const firstIndex = currentIndex === 0;

	// 	if (isExam && firstIndex) {
	// 		return;
	// 	}

	// 	if (isExam && lastIndex) {
	// 		navigateTo('done');
	// 		return;
	// 	}

	// 	if (move === STEP.NEXT) {
	// 		const moveIndex = lastIndex ? 0 : currentIndex + 1;
	// 		navigateTo(ids[moveIndex]);
	// 		return;
	// 	}

	// 	if (move === STEP.PREV) {
	// 		const moveIndex = firstIndex ? ids.length - 1 : currentIndex - 1;
	// 		navigateTo(ids[moveIndex]);
	// 	}
	// };

	// const getPaginationKey = () => {
	// 	let paginationKey = '';
	// 	for (const key in exerciseMode) {
	// 		if (exerciseMode[key]) {
	// 			paginationKey = key;
	// 		}
	// 	}

	// 	return paginationKey;
	// };

	switch (props.exerciseMode) {
		case 'randomMode':
			return <Random {...props} />;
		case 'examMode':
			return <Exam {...props} />;
		case 'infinitiveMode':
			return <Infinitive {...props} />;
		default:
			return null;
	}
};

// {
// 	ids,
// 	exerciseMode,
// 	currentId,
// 	navigateTo,
// 	totalCount,
// 	filedCount,
// 	isAutoNavigate,
// 	paginationType,
// }
