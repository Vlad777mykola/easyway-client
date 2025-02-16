import { ExamModeType } from '../Pagination';
import { swapQuestion } from '../utils/swapQuestion';
import { STEP } from '../constants/constants';
import { NextPrevQuestion } from '@/ui-components/NextPrevQuestion/NextPrevQuestion';
import { PaginationControls } from '@/ui-components/PaginationControls/PaginationControls';

export const Exam = (props: ExamModeType) => {
	const { ids, currentId, navigateTo } = props;
	const currentIndex: number = ids.findIndex((id) => id === currentId);

	const swapNextQuestion = () => {
		const lastIndex = currentIndex === ids.length - 1;
		if (lastIndex) {
			navigateTo('done');
			return;
		}
		swapQuestion(STEP.NEXT, currentIndex, ids, navigateTo);
	};

	return (
		<>
			<NextPrevQuestion swapRight={() => swapNextQuestion()} />
			<PaginationControls exerciseMode={props.exerciseMode} ids={ids} currentIndex={currentIndex} />
		</>
	);
};
