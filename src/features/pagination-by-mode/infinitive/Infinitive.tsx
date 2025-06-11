import { PaginationControls } from '@/features/pagination-controls/PaginationControls';
import { InfinitiveModeType } from '../Pagination';
import { STEP } from '../constants/constants';
import { swapQuestion } from '../utils/swapQuestion';
import { NextPrevQuestion } from '@/ui-components/NextPrevQuestion/NextPrevQuestion';

export const Infinitive = ({ currentId, ids, navigateTo, exerciseMode }: InfinitiveModeType) => {
	const currentIndex: number = ids.findIndex((id) => id === currentId);

	return (
		<>
			<NextPrevQuestion
				swapLeft={() => swapQuestion(STEP.PREV, currentIndex, ids, navigateTo)}
				swapRight={() => swapQuestion(STEP.NEXT, currentIndex, ids, navigateTo)}
			/>
			<PaginationControls
				exerciseMode={exerciseMode}
				ids={ids}
				currentIndex={currentIndex}
				navigateTo={navigateTo}
			/>
		</>
	);
};
