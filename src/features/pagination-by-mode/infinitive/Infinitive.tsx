import { NextPrevQuestion } from '@/ui-components/NextPrevQuestion';
import { PaginationControls } from '@/features/pagination-by-mode/PaginationControls';
import { InfinitiveModeType } from '../Pagination';
import { STEP } from '../constants/constants';
import { swapQuestion } from '../utils/swapQuestion';

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
