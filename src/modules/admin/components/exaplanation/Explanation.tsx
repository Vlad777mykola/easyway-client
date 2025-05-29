import styles from './explanation.module.css';

export const Explanation = ({ title, listOfAdvice }: { title: string; listOfAdvice: string[] }) => (
	<div className={styles.explanationContainer}>
		<div className={styles.content}>
			<h1 className={styles.quoteTitle}>{title}</h1>
			<blockquote className={styles.blockquote}>
				To have another language is to possess a second soul.
			</blockquote>
			<p className={styles.nameOfQuote}>— Charlemagne</p>
			<ol className={styles.explanation}>
				{listOfAdvice.map((item, index) => (
					<li key={index}>{item}</li>
				))}
			</ol>
		</div>
	</div>
);
