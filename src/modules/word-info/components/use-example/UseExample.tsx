import { Typography } from '@/ui-components/Typography';
import { Icon } from '@/ui-components/Icon';
import styles from './useExample.module.css';

export const UseExample = () => {
	return (
		<div className={styles.outerExampleContainer}>
			<div className={styles.exampleContainer}>
				<div className={styles.exampleTitle}>
					<div className={styles.titleContainer}>
						<Icon icon="question" variant="dark" size="xs" />
						<Typography.Text className={styles.title}>Example</Typography.Text>
					</div>
					<Icon icon="aim" />
				</div>
				<div className={styles.examples}>
					<div className={styles.exampleTranslate}>
						<div className={styles.variantTranslation}>
							<div className={styles.englishContainer}>
								<Typography.Text className={styles.english}>
									What are you <b>doing</b> tomorrow ?
								</Typography.Text>
							</div>
							<div className={styles.ukrainianContainer}>
								<Typography.Text className={styles.ukrainian}>
									Що ти будеш робити завтра?
								</Typography.Text>
							</div>
						</div>
					</div>
					<div className={styles.exampleTranslate}>
						<div className={styles.variantTranslation}>
							<div className={styles.englishContainer}>
								<Typography.Text className={styles.english}>
									What are you <b>doing</b> tomorrow ?
								</Typography.Text>
							</div>
							<div className={styles.ukrainianContainer}>
								<Typography.Text className={styles.ukrainian}>
									Що ти будеш робити завтра?
								</Typography.Text>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
