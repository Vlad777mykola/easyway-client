import { Tooltip } from '../Tooltip';
import { Icon } from '../Icon';

import styles from './tooltip.module.css';

export const TooltipLabel = ({ label = '' }: { label: string }) => {
	return (
		<label>
			<Tooltip title={label} color="grey">
				<div className={styles.labelContainer}>
					<span className={styles.label}>{label}</span>
					<Icon icon="info" />
				</div>
			</Tooltip>
		</label>
	);
};
