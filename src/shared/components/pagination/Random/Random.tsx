import { RandomModeType } from '../Pagination';
import styles from './random.module.css';

export const Random = (props: RandomModeType) => {
	return <div>{props.filledCount} Random</div>;
};
