import { getRandomInteger } from '@/shared/utils/get-random-integer';
import { STEP } from '../constants/constants';

export const swapQuestion = (
	move: string,
	exerciseMode: string,
	currentIndex,
	ids,
	navigateTo: (id: string) => void,
) => {
	if (exerciseMode === 'randomMode') {
		const moveIndex = getRandomInteger(currentIndex, ids.length - 1);
		navigateTo(ids[moveIndex]);
		return;
	}

	const lastIndex = currentIndex === ids.length - 1;
	const firstIndex = currentIndex === 0;

	if (exerciseMode === 'examMode' && firstIndex) {
		return;
	}

	if (exerciseMode === 'examMode' && lastIndex) {
		navigateTo('done');
		return;
	}

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
