import { useState } from 'react';
import { Button } from '@/ui-components/Button';
import { InfinitiveModeType } from '../Pagination';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';
import { DOTS, PAGE_SIZE, SIBLING_COUNT, STEP } from '../constants/constants';
import { swapQuestion } from '../services/service';
import { usePagination } from '../hooks/usePagination';
import styles from './infinitive.module.css';

export const Infinitive = (props: InfinitiveModeType) => {
	const { currentId, exerciseMode, ids, navigateTo } = props;
	const currentIndex: number = ids.findIndex((id) => id === currentId);
	const paginationRange =
		usePagination({
			totalCount: ids.length,
			pageSize: PAGE_SIZE,
			siblingCount: SIBLING_COUNT,
			currentPage: currentIndex + 1,
		}) || [];

	if (paginationRange.length < 2) {
		return null;
	}

	return (
		<>
			<div className={styles.prevQuestion}>
				<CircleButton
					type="default"
					size="large"
					onClick={() => {
						swapQuestion(STEP.PREV, exerciseMode, currentIndex, ids, navigateTo);
					}}
				>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton
					type="default"
					size="large"
					onClick={() => {
						swapQuestion(STEP.NEXT, exerciseMode, currentIndex, ids, navigateTo);
					}}
				>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
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
							key={id}
							size="small"
							type={isActive ? 'primary' : 'default'}
							onClick={() =>
								navigateTo(
									typeof paginationPage === 'number' && paginationPage
										? ids[paginationPage - 1]
										: '',
								)
							}
						>
							{paginationRange[index]}
						</Button>
					);
				})}
			</div>
		</>
	);
};
