import { Tooltip } from '../Tooltip';
import { Icon } from '../Icon';

import styles from './tooltip.module.css';

export const TooltipLabel = ({ label = '' }: { label: string }) => {
	return (
		<label className={styles.labelContainer}>
			<span className={styles.label}>{label}</span>
			<Tooltip title={label} color="grey">
				<div>
					<Icon icon="info" size="xs" />
				</div>
			</Tooltip>
		</label>
	);
};
