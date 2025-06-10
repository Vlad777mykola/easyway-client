import { classes } from '@/ui-design-atoms/classes';

// eslint-disable-next-line css-modules/no-unused-class
import styles from './partOfSpeech.module.css';

export const PartOfSpeech = ({ type }: { type: string }) => (
	<span className={classes(styles.type, styles[`${type.toLowerCase()}`])}>
		{'['} {type} {']'}
	</span>
);
