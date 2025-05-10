import { Icon } from '@/ui-components/Icon';
import styles from './commonInfo.module.css';

export const CommonInfo = ({
	takenTestCount,
	total,
}: {
	takenTestCount: number;
	total: number;
}) => (
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
				<p className={styles.progressItem}>{takenTestCount}</p>
			</div>
		</div>
	</div>
);
