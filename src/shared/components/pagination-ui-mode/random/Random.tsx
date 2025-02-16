import { RandomModeType } from '../Pagination';
import { Progress } from '@/shared/components/progress';
import { getRandomInteger } from '@/shared/utils/get-random-integer';
import { NextPrevQuestion } from '../../../../ui-components/NextPrevQuestion/NextPrevQuestion';
import { STEP } from '../constants/constants';
import styles from './random.module.css';

export const Random = (props: RandomModeType) => {
	const currentIndex: number = props.ids.findIndex((id) => id === props.currentId);
	return (
		<>
			<div className={styles.nextQuestion}>
				<NextPrevQuestion
					direction={STEP.NEXT}
					swapQuestion={() => {
						const moveIndex = getRandomInteger(currentIndex, props.ids.length - 1);
						props.navigateTo(props.ids[moveIndex]);
					}}
				/>
			</div>
			<Progress filledSteps={props.filledCount} totalSteps={props.totalCount} />
		</>
	);
};
