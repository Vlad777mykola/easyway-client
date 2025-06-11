import { Icon } from '@/ui-components/Icon';
import styles from './useExample.module.css';

export const UseExample = () => {
	return (
		<div className={styles.outerExampleContainer}>
			<div className={styles.exampleContainer}>
				<div className={styles.exampleTitle}>
					<div className={styles.titleContainer}>
						<Icon icon="question" variant="dark" size="xs" />
						<span className={styles.title}>Example</span>
					</div>
					<Icon icon="aim" />
				</div>
				<div className={styles.examples}>
					<div className={styles.exampleTranslate}>
						<div className={styles.variantTranslation}>
							<div className={styles.englishContainer}>
								<span className={styles.english}>
									What are you <b>doing</b> tomorrow ?
								</span>
							</div>
							<div className={styles.ukrainianContainer}>
								<span className={styles.ukrainian}>Що ти будеш робити завтра?</span>
							</div>
						</div>
					</div>
					<div className={styles.exampleTranslate}>
						<div className={styles.variantTranslation}>
							<div className={styles.englishContainer}>
								<span className={styles.english}>
									What are you <b>doing</b> tomorrow ?
								</span>
							</div>
							<div className={styles.ukrainianContainer}>
								<span className={styles.ukrainian}>Що ти будеш робити завтра?</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
