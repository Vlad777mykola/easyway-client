import { CircleButton } from '@/ui-components/CircleButton';
import { STEP, StepType } from '../constants/constants';
import { Icon } from '@/ui-components/Icon';

export const NextPrevQuestion = ({
	direction,
	swapQuestion,
}: {
	direction: StepType;
	swapQuestion: () => void;
}) => {
	if (direction === STEP.PREV) {
		return (
			<CircleButton
				type="default"
				size="large"
				onClick={() => {
					swapQuestion();
				}}
			>
				<Icon icon="left" variant="dark" />
			</CircleButton>
		);
	}
	if (direction === STEP.NEXT) {
		return (
			<CircleButton
				type="default"
				size="large"
				onClick={() => {
					swapQuestion();
				}}
			>
				<Icon icon="right" variant="dark" />
			</CircleButton>
		);
	}
};
