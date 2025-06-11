import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';

import styles from './errorProgressPagination.module.css';
import { PaginationControls } from './PaginationControls';

const RIGHT = 'right';
const LEFT = 'left';
const MIN_COUNT_FOR_PAGINATION = 7;

export const ErrorProgressPagination = ({
	uncorrectAnswers,
	pathname,
}: {
	uncorrectAnswers: string[];
	pathname: string;
}) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const navigate = useNavigate();

	const navigateBar = (side: 'right' | 'left') => {
		if (side === RIGHT && currentIndex < uncorrectAnswers.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
		if (side === RIGHT && currentIndex === uncorrectAnswers.length - 1) {
			setCurrentIndex(0);
		}
		if (side === LEFT) {
			setCurrentIndex(currentIndex - 1);
		}
		if (side === LEFT && currentIndex === 0) {
			setCurrentIndex(uncorrectAnswers.length - 1);
		}
	};

	const onClickQuestion = (id: string) => {
		navigate(`/${pathname}/word/${id}`);
	};

	return (
		<>
			{uncorrectAnswers.length > 0 && (
				<div className={styles.uncorrectAnswersContainer}>
					<span className={styles.modeTitle}>Exam Mistakes</span>
					<div className={styles.paginationBar}>
						{uncorrectAnswers.length > MIN_COUNT_FOR_PAGINATION && (
							<CircleButton onClick={() => navigateBar(LEFT)}>
								<Icon icon="left" />
							</CircleButton>
						)}
						<PaginationControls
							exerciseMode="infinitiveMode"
							ids={uncorrectAnswers}
							currentIndex={currentIndex}
							navigateTo={onClickQuestion}
						/>
						{uncorrectAnswers.length >= MIN_COUNT_FOR_PAGINATION && (
							<CircleButton onClick={() => navigateBar(RIGHT)}>
								<Icon icon="right" />
							</CircleButton>
						)}
					</div>
				</div>
			)}
		</>
	);
};
