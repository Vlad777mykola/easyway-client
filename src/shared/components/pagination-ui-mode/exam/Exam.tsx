import { ExamModeType } from '../Pagination';
import { swapQuestion } from '../utils/swapQuestion';
import { STEP } from '../constants/constants';
import { NextPrevQuestion } from '../../../../ui-components/NextPrevQuestion/NextPrevQuestion';
import { PaginationControls } from '../../../../ui-components/PaginationControls/PaginationControls';
import styles from './exam.module.css';

export const Exam = (props: ExamModeType) => {
	const { ids, currentId, navigateTo } = props;
	const currentIndex: number = ids.findIndex((id) => id === currentId);

	return (
		<>
			<div className={styles.nextQuestion}>
				<NextPrevQuestion
					direction={STEP.NEXT}
					swapQuestion={() => {
						const lastIndex = currentIndex === ids.length - 1;
						if (lastIndex) {
							navigateTo('done');
							return;
						}
						swapQuestion(STEP.NEXT, currentIndex, ids, navigateTo);
					}}
				/>
			</div>
			<PaginationControls exerciseMode={props.exerciseMode} ids={ids} currentIndex={currentIndex} />
		</>
	);
};
