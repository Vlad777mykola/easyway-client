import { Typography } from '@/ui-components/Typography';
import styles from './explanation.module.css';

export const Explanation = ({ title, listOfAdvice }: { title: string; listOfAdvice: string[] }) => (
	<div className={styles.explanationContainer}>
		<div className={styles.content}>
			<Typography.Title className={styles.quoteTitle}>{title}</Typography.Title>
			<blockquote className={styles.blockquote}>
				To have another language is to possess a second soul.
			</blockquote>
			<Typography.Text className={styles.nameOfQuote}>— Charlemagne</Typography.Text>
			<ol className={styles.explanation}>
				{listOfAdvice.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ol>
		</div>
	</div>
);
