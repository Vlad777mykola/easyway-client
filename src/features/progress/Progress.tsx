import { classes } from '@/ui-design-atoms/classes';
import styles from './progress.module.css';

type Props = {
	filledSteps: number;
	totalSteps: number;
};

export const Progress = ({ filledSteps, totalSteps }: Props) => {
	return (
		<div className={styles.progress}>
			{Array.from({ length: totalSteps }).map((_, index) => (
				<div
					key={index}
					className={classes(styles.progressItem, {
						[styles.filledPass]: index + 1 <= filledSteps,
					})}
				/>
			))}
		</div>
	);
};
