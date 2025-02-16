import { Button } from '@/ui-components/Button';
import { DOTS, PAGE_SIZE, SIBLING_COUNT } from '../constants/constants';
import styles from './pagination-controls.module.css';
import { useMemo } from 'react';
import { getRangePagination } from '../utils/getRangePagination';

export const PaginationControls = ({
	exerciseMode,
	ids,
	currentIndex,
	navigateTo = () => {},
}: {
	exerciseMode: 'randomMode' | 'infinitiveMode' | 'examMode';
	ids: string[];
	currentIndex: number;
	navigateTo?: (id: string) => void;
}) => {
	const paginationRange: (string | number)[] =
		useMemo(
			() => getRangePagination(ids.length, PAGE_SIZE, SIBLING_COUNT, currentIndex + 1),
			[ids.length, PAGE_SIZE, SIBLING_COUNT, currentIndex],
		) || [];

	if (paginationRange.length < 2) {
		return null;
	}

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
