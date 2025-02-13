import { CircleButton } from '@/ui-components/CircleButton';
import { ExamModeType } from '../Pagination';
import styles from './exam.module.css';
import { Icon } from '@/ui-components/Icon';
import { swapQuestion } from '../services/service';
import { STEP } from '../constants/constants';

export const Exam = (props: ExamModeType) => {
	const currentIndex: number = props.ids.findIndex((id) => id === props.currentId);
	return (
		<>
			<div className={styles.nextQuestion}>
				<CircleButton
					type="default"
					size="large"
					onClick={() =>
						swapQuestion(STEP.NEXT, props.exerciseMode, currentIndex, props.ids, props.navigateTo)
					}
				>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
		</>
	);
};
