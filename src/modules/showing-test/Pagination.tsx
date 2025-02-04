import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { getRandomInteger } from '@/shared/utils/get-random-integer';

import styles from './pagination.module.css';
import { Progress } from '@/shared/components/progress';

const STEP = {
	PREV: 'prev',
	NEXT: 'next',
};

export const Pagination = ({
	ids,
	currentId,
	navigateTo,
	isRandom,
	totalCountOfQuestions,
	correctQuestions,
}: {
	isRandom: boolean;
	currentId: string;
	ids: { id: string }[];
	navigateTo: (id: string) => void;
	totalCountOfQuestions: number;
	correctQuestions: number;
}) => {
	const swapQuestion = (move: string) => {
		let currentIndex: number = ids.findIndex((item) => item.id === currentId);

		if (isRandom) {
			const moveIndex = getRandomInteger(currentIndex, ids.length - 1);
			navigateTo(ids[moveIndex].id);
			return;
		}

		if (move === STEP.NEXT) {
			const moveIndex = currentIndex === ids.length - 1 ? 0 : currentIndex + 1;
			navigateTo(ids[moveIndex].id);
		}

		if (move === STEP.PREV) {
			const moveIndex = currentIndex === 0 ? ids.length - 1 : currentIndex - 1;
			navigateTo(ids[moveIndex].id);
		}
	};

	return (
		<>
			<div className={styles.prevQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(STEP.PREV)}>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton type="default" size="large" onClick={() => swapQuestion(STEP.NEXT)}>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
			{!isRandom && (
				<div className={styles.pagination}>
					{ids.map((item, index) => (
						<Button key={item.id} size="small" type="default" onClick={() => navigateTo(item.id)}>
							{index + 1}
						</Button>
					))}
				</div>
			)}
			{isRandom && <Progress filledSteps={correctQuestions} totalSteps={totalCountOfQuestions} />}
		</>
	);
};
