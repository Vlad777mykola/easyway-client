import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import styles from './addInfo.module.css';
import { ErrorProgressPagination } from '@/features/error-progress-pagination/ErrorProgressPagination';

export const AddInfo = ({
	progress,
	path,
	id,
	showInfo,
	handleShowAddInfo,
}: {
	progress: {
		exam: number;
		resolved: number;
		progress: number;
		unTouch: number;
		errorProgress: string[];
	};
	path: string;
	id: string;
	showInfo: boolean;
	handleShowAddInfo: (id: string) => void;
}) => (
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
							<p className={styles.progressItem}>Completed: {progress.exam || 0}%</p>
						</div>
						<div className={styles.progressItemContainer}>
							<ErrorProgressPagination uncorrectAnswers={progress.errorProgress} pathname={path} />
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
							<p className={styles.progressItem}>Resolved: {progress.resolved || 0}%</p>
						</div>
						<div className={styles.progressItemContainer}>
							<span className={styles.progressItem}>
								<Icon icon="clock" />
							</span>
							<p className={styles.progressItem}>Progress: {progress.progress || 0}%</p>
						</div>
						<div className={styles.progressItemContainer}>
							<span className={styles.progressItem}>
								<Icon icon="frown" />
							</span>
							<p className={styles.progressItem}>Untouch: {progress.unTouch || 0}%</p>
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
