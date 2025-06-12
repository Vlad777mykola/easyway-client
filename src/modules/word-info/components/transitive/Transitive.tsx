import { Typography } from '@/ui-components/Typography';

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
					<Typography.Text className={styles.transitive}>Transitive: </Typography.Text>
					<Typography.Text className={styles.wordTransitive}>
						<b>{name}</b>
					</Typography.Text>
					<Typography.Text className={styles.sth}>{sentenceWithoutName}</Typography.Text>
				</div>
			)}
			{isNotTransitive && (
				<div className={styles.transitiveContainer}>
					<Typography.Text className={styles.inTransitive}>{inTransitiveTitle}</Typography.Text>
					{inTransitiveSentence && (
						<div>
							<Typography.Text className={styles.wordTransitive}>
								<b>{name}</b>
							</Typography.Text>
							<Typography.Text className={styles.sth}>{sentenceWithoutName}</Typography.Text>
						</div>
					)}
				</div>
			)}
		</div>
	);
};
