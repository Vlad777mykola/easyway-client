import { Icon } from '@/ui-components/Icon';
import { TakenTestCount } from '@/store/progress';
import styles from './commonInfo.module.css';

export const CommonInfo = ({
	total,
	takenTestCount,
}: {
	total: number;
	takenTestCount: TakenTestCount;
}) => {
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
