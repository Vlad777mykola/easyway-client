import { InfinitiveModeType } from '../Pagination';
import { STEP } from '../constants/constants';
import { swapQuestion } from '../utils/swapQuestion';
import { NextPrevQuestion } from '../../../../ui-components/NextPrevQuestion/NextPrevQuestion';
import { PaginationControls } from '../../../../ui-components/PaginationControls/PaginationControls';

export const Infinitive = (props: InfinitiveModeType) => {
	const { currentId, ids, navigateTo, exerciseMode } = props;
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
