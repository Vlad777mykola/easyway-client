import { useEffect } from 'react';
import { useDebounce } from '@/shared/hooks/use-debounce';
import { Random } from './Random/Random';
import { Infinitive } from './Infinitive/Infinitive';
import { Exam } from './Exam/Exam';
import { STEP } from './constants/constants';
import { swapQuestion } from './utils/swapQuestion';

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
	exerciseMode: 'examMode';
};

export type InfinitiveModeType = BaseFieldsDataType & {
	exerciseMode: 'infinitiveMode';
};

export const Pagination = (props: ExamModeType | RandomModeType | InfinitiveModeType) => {
	const debouncedAutoNavigate = useDebounce(props.isAutoNavigate, 1000);
	const currentIndex: number = props.ids.findIndex((id) => id === props.currentId);

	useEffect(() => {
		if (debouncedAutoNavigate) {
			swapQuestion(STEP.NEXT, currentIndex, props.ids, props.navigateTo);
		}
	}, [debouncedAutoNavigate]);

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
