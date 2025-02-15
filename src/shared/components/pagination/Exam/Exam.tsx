import { CircleButton } from '@/ui-components/CircleButton';
import { ExamModeType } from '../Pagination';
import { Icon } from '@/ui-components/Icon';
import { swapQuestion } from '../services/service';
import { DOTS, PAGE_SIZE, SIBLING_COUNT, STEP } from '../constants/constants';
import { usePagination } from '../hooks/usePagination';
import { Button } from '@/ui-components/Button';
import styles from './exam.module.css';

export const Exam = (props: ExamModeType) => {
	const { ids, currentId, exerciseMode, navigateTo } = props;
	const currentIndex: number = ids.findIndex((id) => id === currentId);
	const paginationRange =
		usePagination({
			totalCount: ids.length,
			pageSize: PAGE_SIZE,
			siblingCount: SIBLING_COUNT,
			currentPage: currentIndex + 1,
		}) || [];
	return (
		<>
			<div className={styles.nextQuestion}>
				<CircleButton
					type="default"
					size="large"
					onClick={() => swapQuestion(STEP.NEXT, exerciseMode, currentIndex, ids, navigateTo)}
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
							className={styles.noHoverEffect}
							variant="outlined"
							key={id}
							size="small"
							type={isActive ? 'primary' : 'default'}
						>
							{paginationRange[index]}
						</Button>
					);
				})}
			</div>
		</>
	);
};
