import { memo, useEffect } from 'react';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { CircleButton } from '@/ui-components/CircleButton';
import { getRandomInteger } from '@/shared/utils/get-random-integer';
import { Progress } from '@/shared/components/progress';
import { useDebounce } from '@/shared/hooks/use-debounce';

import styles from './pagination.module.css';

const STEP = {
	PREV: 'prev',
	NEXT: 'next',
};

export const Pagination = memo(
	({
		ids,
		exerciseMode,
		currentId,
		navigateTo,
		totalCount,
		filedCount,
		isAutoNavigate,
	}: {
		currentId: string;
		exerciseMode: { [key: string]: boolean };
		ids: string[];
		navigateTo: (id: string) => void;
		totalCount: number;
		filedCount: number;
		isAutoNavigate?: boolean;
	}) => {
		const debouncedAutoNavigate = useDebounce(isAutoNavigate, 1000);
		const { isRandom, isExam } = exerciseMode;
		const currentIndex: number = ids.findIndex((id) => id === currentId);

		useEffect(() => {
			if (debouncedAutoNavigate) {
				swapQuestion(STEP.NEXT);
			}
		}, [debouncedAutoNavigate]);

		const swapQuestion = (move: string) => {
			if (isRandom) {
				const moveIndex = getRandomInteger(currentIndex, ids.length - 1);
				navigateTo(ids[moveIndex]);
				return;
			}

			const lastIndex = currentIndex === ids.length - 1;
			const firstIndex = currentIndex === 0;

			if (isExam && firstIndex) {
				return;
			}

			if (isExam && lastIndex) {
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
						{ids.map((id, index) => (
							<Button
								key={id}
								size="small"
								type={currentIndex === index ? 'primary' : 'default'}
								onClick={() => navigateTo(id)}
							>
								{index + 1}
							</Button>
						))}
					</div>
				)}
				{isRandom && <Progress filledSteps={filedCount} totalSteps={totalCount} />}
			</>
		);
	},
);
