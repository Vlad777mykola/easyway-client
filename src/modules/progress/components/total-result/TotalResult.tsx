import styles from './totalResult.module.css';

export const TotalResult = ({ count }: { count: number }) => {
	return (
		<div className={styles.totalContainer}>
			<span className={styles.title}>Taken test during the day: {count}</span>
		</div>
	);
};
