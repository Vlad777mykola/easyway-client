import { ErrorProgressPagination } from '@/shared/components/error-progress-pagination/ErrorProgressPagination';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { useGetProgress } from '../../hooks/useGetProgress';
import styles from './addInfo.module.css';

export const AddInfo = ({
	progressId,
	path,
	id,
	showInfo,
	handleShowAddInfo,
}: {
	progressId: string;
	path: string;
	id: string;
	showInfo: boolean;
	handleShowAddInfo: (id: string) => void;
}) => {
	const { exam, random, errorProgress } = useGetProgress(progressId);

	return (
		<>
			{!showInfo && (
				<div className={styles.showAddInfoContainer}>
					<Button onClick={() => handleShowAddInfo(id)}>Show More</Button>
				</div>
			)}
			{showInfo && (
				<div className={styles.addInfo}>
					<div className={styles.commonProgress}>
						<div className={styles.randomProgress}>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="trophy" />
								</span>
								<p className={styles.progressItem}>Exam</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="check" />
								</span>
								<p className={styles.progressItem}>Completed: {exam || 0}%</p>
							</div>
							<div className={styles.progressItemContainer}>
								<ErrorProgressPagination uncorrectAnswers={errorProgress} pathname={path} />
							</div>
						</div>
						<div className={styles.randomProgress}>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="question" />
								</span>
								<p className={styles.progressItem}>Random</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="check" />
								</span>
								<p className={styles.progressItem}>Resolved: {random.resolved || 0}%</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="clock" />
								</span>
								<p className={styles.progressItem}>Progress: {random.progress || 0}%</p>
							</div>
							<div className={styles.progressItemContainer}>
								<span className={styles.progressItem}>
									<Icon icon="frown" />
								</span>
								<p className={styles.progressItem}>Untouch: {random.unTouch || 0}%</p>
							</div>
						</div>
					</div>
					<div className={styles.showAddInfoContainer}>
						<Button onClick={() => handleShowAddInfo(id)}>Show Less</Button>
					</div>
				</div>
			)}
		</>
	);
};
