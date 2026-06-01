import { useState } from 'react';
import { CircleProgressBar } from '@/ui-components/CircleProgressBar';
import { Button } from '@/ui-components/Button';
import { ErrorProgressPagination } from '../error-progress-pagination/ErrorProgressPagination';
import { useProgressStore } from '@/store/progress';
import { classes } from '@/ui-design-atoms/classes';
import styles from './addInfo.module.css';
import { usePlatformData } from '@/context/platform';

export const AddInfo = () => {
	const [showMore, setShowMore] = useState(false);
	const { isMobile, isLaptop, isDesktop } = usePlatformData();
	const examPercentage = useProgressStore.use.progressPercentage().exam;
	const randomPercentage = useProgressStore.use.progressPercentage().random;
	const moreInfo = showMore || isDesktop || isLaptop;

	const handleShowMoreInfo = () => {
		setShowMore(!showMore);
	};

	return (
		<>
			{moreInfo && (
				<div className={styles.statistics}>
					<ErrorProgressPagination />
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Exam</span>
						<CircleProgressBar resolved={examPercentage} />
					</div>
					<div className={styles.modeContainer}>
						<span className={styles.modeTitle}>Random</span>
						<div className={styles.randomProgress}>
							<CircleProgressBar
								progress={randomPercentage.progress}
								resolved={randomPercentage.resolved}
								untouched={randomPercentage.unTouch}
							/>
							<div className={styles.explanation}>
								<div className={styles.markersExplanation}>
									<div className={classes(styles.marker, styles.success)} />
									<span className={styles.explanation}>- success</span>
								</div>
								<div className={styles.markersExplanation}>
									<div className={classes(styles.marker, styles.error)} />
									<span className={styles.explanation}>- untouch</span>
								</div>
								<div className={styles.markersExplanation}>
									<div className={classes(styles.marker, styles.primary)} />
									<span className={styles.explanation}>- progress</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
			{isMobile && (
				<div className={styles.moreInfoContainer}>
					<Button onClick={handleShowMoreInfo} type="default" size="middle" block>
						{showMore ? 'Less Info' : 'More Info'}
					</Button>
				</div>
			)}
		</>
	);
};
