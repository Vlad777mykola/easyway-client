import { InfinitiveModeType } from '../Pagination';
import { STEP } from '../constants/constants';
import { swapQuestion } from '../utils/swapQuestion';
import { NextPrevQuestion } from '../next-prev-question/NextPrevQuestion';
import { PaginationControls } from '../pagination-controls/PaginationControls';
import styles from './infinitive.module.css';

export const Infinitive = (props: InfinitiveModeType) => {
	const { currentId, ids, navigateTo, exerciseMode } = props;
	const currentIndex: number = ids.findIndex((id) => id === currentId);

	return (
		<>
			<div className={styles.prevQuestion}>
				<NextPrevQuestion
					direction={STEP.PREV}
					swapQuestion={() => swapQuestion(STEP.PREV, currentIndex, ids, navigateTo)}
				/>
			</div>
			<div className={styles.nextQuestion}>
				<NextPrevQuestion
					direction={STEP.NEXT}
					swapQuestion={() => swapQuestion(STEP.NEXT, currentIndex, ids, navigateTo)}
				/>
			</div>
			<PaginationControls
				exerciseMode={exerciseMode}
				ids={ids}
				currentIndex={currentIndex}
				navigateTo={navigateTo}
			/>
		</>
	);
};
