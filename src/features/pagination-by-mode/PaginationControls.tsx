import { useMemo } from 'react';
import { Button } from '@/ui-components/Button';
import { DOTS, PAGE_SIZE, SIBLING_COUNT } from '@/features/pagination-by-mode/constants/constants';
import { getRangePagination } from './utils/getRangePagination';
import { ExerciseModeType } from '@/store/exercise-progress/useExerciseProgressStore';

import styles from './pagination-controls.module.css';

export const PaginationControls = ({
	exerciseMode,
	ids,
	currentIndex,
	navigateTo = () => {},
}: {
	exerciseMode: ExerciseModeType;
	ids: string[];
	currentIndex: number;
	navigateTo?: (id: string) => void;
}) => {
	const paginationRange: (string | number)[] = useMemo(
		() => getRangePagination(ids.length, PAGE_SIZE, SIBLING_COUNT, currentIndex + 1) || [],
		[ids.length, currentIndex],
	);

	return (
		<div className={styles.pagination}>
			{ids.map((id, index) => {
				const paginationPage: number | string | undefined = paginationRange[index];

				if (paginationPage === DOTS) {
					return (
						<span className={styles.dots} key={index}>
							&#8230;
						</span>
					);
				}

				if (typeof paginationPage !== 'number') return null;

				const isActive = currentIndex === paginationPage - 1;

				return (
					<Button
						className={exerciseMode === 'examMode' ? styles.noHoverEffect : ''}
						key={id}
						size="small"
						type={isActive ? 'primary' : 'default'}
						onClick={() =>
							navigateTo(
								typeof paginationPage === 'number' && paginationPage ? ids[paginationPage - 1] : '',
							)
						}
					>
						{paginationRange[index]}
					</Button>
				);
			})}
		</div>
	);
};
