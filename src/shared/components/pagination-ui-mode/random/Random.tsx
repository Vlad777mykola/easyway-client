import { RandomModeType } from '../Pagination';
import { Progress } from '@/shared/components/progress';
import { getRandomInteger } from '@/shared/utils/get-random-integer';
import { NextPrevQuestion } from '../../../../ui-components/NextPrevQuestion/NextPrevQuestion';

export const Random = (props: RandomModeType) => {
	const { ids, currentId, totalCount, filledCount, navigateTo } = props;
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
