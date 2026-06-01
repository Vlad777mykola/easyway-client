import { Form, Select as SelectAnt } from 'antd';
import type { SelectProps } from 'antd';
import { Tooltip } from 'antd';

import styles from './styles.module.css';

export const Select = ({ ...props }: SelectProps & { label?: string; tooltipTitle?: string }) => {
	const { tooltipTitle, label } = props;
	return (
		<Form.Item
			label={
				label && (
					<Tooltip className={styles.containerSelect} title={tooltipTitle} color="blue">
						<span className={styles.containerSelect}>{label}</span>
					</Tooltip>
				)
			}
			className={styles.containerSelect}
		>
			<SelectAnt {...props} />
		</Form.Item>
	);
};
