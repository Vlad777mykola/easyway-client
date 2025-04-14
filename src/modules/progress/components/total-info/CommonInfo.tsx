import { Icon } from '@/ui-components/Icon';
import { TakenTestCount } from '@/store/progress';
import styles from './commonInfo.module.css';
import { useGetProgress } from '../../hooks/useGetProgress';

export const CommonInfo = ({
	takenTestCount,
	progressId,
}: {
	takenTestCount: TakenTestCount;
	progressId: string;
}) => {
	const { total } = useGetProgress(progressId);

	return (
		<div className={styles.commonProgress}>
			<div className={styles.randomProgress}>
				<div className={styles.progressItemContainer}>
					<span className={styles.progressItem}>
						<Icon icon="stock" />
					</span>
					<p className={styles.progressItem}>Total: </p>
					<p className={styles.progressItem}>{total || 0}%</p>
				</div>
			</div>
			<div className={styles.randomProgress}>
				<div className={styles.progressItemContainer}>
					<span className={styles.progressItem}>
						<Icon icon="time" />
					</span>
					<p className={styles.progressItem}>Taken test count: </p>
					<p className={styles.progressItem}>{takenTestCount?.count}</p>
				</div>
			</div>
		</div>
	);
};
