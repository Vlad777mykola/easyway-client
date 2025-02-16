import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';
import styles from './next-prev-question.module.css';

export const NextPrevQuestion = ({
	swapRight,
	swapLeft,
}: {
	swapRight?: () => void;
	swapLeft?: () => void;
}) => (
	<>
		{swapLeft && (
			<div className={styles.prevQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapLeft()}>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
		)}
		{swapRight && (
			<div className={styles.nextQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapRight()}>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
		)}
	</>
);
