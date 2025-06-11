import styles from './transitive.module.css';

export const Transitive = ({
	isTransitive,
	isNotTransitive,
	name,
	inTransitiveSentence,
}: {
	isTransitive: boolean;
	isNotTransitive: boolean;
	name: string;
	inTransitiveSentence?: string;
}) => {
	const str = inTransitiveSentence;
	const regex = new RegExp(`${name}`);
	const sentenceWithoutName = str?.replace(regex, '') || '';
	const inTransitiveTitle = inTransitiveSentence ? 'Intransitive:' : 'Intransitive';

	return (
		<div className={styles.transitiveAndIntransitive}>
			{isTransitive && (
				<div className={styles.transitiveContainer}>
					<span className={styles.transitive}>Transitive: </span>
					<span className={styles.wordTransitive}>
						<b>{name}</b>
					</span>
					<span className={styles.sth}>sth</span>
				</div>
			)}
			{isNotTransitive && (
				<div className={styles.transitiveContainer}>
					<span className={styles.inTransitive}>{inTransitiveTitle}</span>
					{inTransitiveSentence && (
						<div>
							<span className={styles.wordTransitive}>
								<b>{name}</b>
							</span>
							<span className={styles.sth}>{sentenceWithoutName}</span>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
