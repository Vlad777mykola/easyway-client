import { StandardProgressBar } from '@/ui-components/CustomProgress/StandartProgressBar';
import styles from './totalResult.module.css';
import { Icon } from '@/ui-components/Icon';

export const TotalResult = ({
	total,
	exam,
	resolved,
	progress,
}: {
	total: number;
	exam: number;
	resolved: number;
	progress: number;
}) => {
	return (
		<div className={styles.totalContainer}>
			<p className={styles.title}>Total Progress</p>
			<div className={styles.progressBarContainer}>
				<StandardProgressBar progress={total} size="m" fullwidth />
			</div>
			<div className={styles.addInfo}>
				<div className={styles.progressContainer}>
					<div className={styles.progressItem}>
						<Icon icon="trophy" />
						<span>Exam</span>
					</div>
					<div className={styles.progressItem}>
						<Icon icon="check" />
						<span>Completed: {exam}%</span>
					</div>
				</div>
				<div className={styles.progressContainer}>
					<div className={styles.progressItem}>
						<Icon icon="question" />
						<span>Random</span>
					</div>
					<div className={styles.progressItem}>
						<Icon icon="check" />
						<span>Resolved: {resolved}%</span>
					</div>
					<div className={styles.progressItem}>
						<Icon icon="clock" />
						<span>Progress: {progress}%</span>
					</div>
				</div>
			</div>
		</div>
	);
};
