import { Progress } from '@/features/progress';
import { getRandomInteger } from '@/shared/utils/get-random-integer';
import { NextPrevQuestion } from '@/ui-components/NextPrevQuestion';
import { RandomModeType } from '../Pagination';

export const Random = ({ ids, currentId, totalCount, filledCount, navigateTo }: RandomModeType) => {
	const currentIndex: number = ids.findIndex((id) => id === currentId);

	const swapNext = () => {
		const moveIndex = getRandomInteger(currentIndex, ids.length - 1);
		navigateTo(ids[moveIndex]);
	};

	return (
		<>
			<NextPrevQuestion swapRight={() => swapNext()} />
			<Progress filledSteps={filledCount} totalSteps={totalCount} />
		</>
	);
};
