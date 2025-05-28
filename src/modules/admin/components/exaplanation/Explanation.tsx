import styles from './explanation.module.css';

export const Explanation = () => (
	<div className={styles.explanationContainer}>
		<div className={styles.content}>
			<h1 className={styles.quoteTitle}>Create Filters</h1>
			<blockquote className={styles.blockquote}>
				To have another language is to possess a second soul.
			</blockquote>
			<p className={styles.nameOfQuote}>— Charlemagne</p>
			<ol className={styles.explanation}>
				<li>This form is designed to create collection filters.</li>
				<li>At least one of the items must have a list.</li>
				<li>The form does not allow having the same item in the list.</li>
			</ol>
		</div>
	</div>
);
