import { STEP, StepType } from '../constants/constants';

export const swapQuestion = (
	move: StepType,
	currentIndex: number,
	ids: string[],
	navigateTo: (id: string) => void,
) => {
	const lastIndex = currentIndex === ids.length - 1;
	const firstIndex = currentIndex === 0;

	if (move === STEP.NEXT) {
		const moveIndex = lastIndex ? 0 : currentIndex + 1;
		navigateTo(ids[moveIndex]);
		return;
	}

	if (move === STEP.PREV) {
		const moveIndex = firstIndex ? ids.length - 1 : currentIndex - 1;
		navigateTo(ids[moveIndex]);
	}
};
