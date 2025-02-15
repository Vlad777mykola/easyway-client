import { RandomModeType } from '../Pagination';
import { Progress } from '@/shared/components/progress';
import styles from './random.module.css';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';
import { swapQuestion } from '../services/service';
import { STEP } from '../constants/constants';

export const Random = (props: RandomModeType) => {
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
			<Progress filledSteps={props.filledCount} totalSteps={props.totalCount} />
		</>
	);
};
