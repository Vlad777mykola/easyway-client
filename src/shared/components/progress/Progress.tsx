import { classes } from '@/shared/utils/classes';
import styles from './progress.module.css';

type Props = {
	filledSteps: number;
	totalSteps: number;
};

export const Progress = ({ filledSteps, totalSteps }: Props) => {
	console.log('FILLED STEPS', filledSteps);
	console.log('TOTAL STEPS', totalSteps);

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
