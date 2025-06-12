import { classes } from '@/ui-design-atoms/classes';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './partOfSpeechFlag.module.css';

export const PartOfSpeechFlag = ({
	type,
	ukrainianType,
}: {
	type: string;
	ukrainianType: string;
}) => (
	<div className={styles.typeContainer}>
		<div className={classes(styles.flag, styles[`${type.toLowerCase()}`])}>
			<span className={styles.type}>{ukrainianType.toUpperCase()}</span>
		</div>
		<svg
			className={classes(styles.svg, styles[`${type.toLowerCase()}Svg`])}
			viewBox="0 0 104 40"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M 3.51735 3.43156 C 2.23343 2.17895 3.12026 0 4.914 0 H 103 V 40 H 4.914 C 3.12026 40 2.23343 37.821 3.51735 36.5684 L 19.0326 21.4316 C 19.8371 20.6467 19.8371 19.3533 19.0326 18.5684 L 3.51735 3.43156 Z"></path>
		</svg>
	</div>
);
