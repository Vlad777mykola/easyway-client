import { FormFilters } from './components/form-filters/FormFilters';
import { SecondTab } from './components/second-tab/SecondTab';
import { Tabs } from '@/ui-components/Tabs';
import { useState } from 'react';

import styles from './admin.module.css';

export const Admin = () => {
	const [activeKey, setActiveKey] = useState('1');

	const tabs = [
		{
			key: '1',
			label: <span className={styles.tab}>Filters</span>,
			children: <FormFilters />,
		},
		{
			key: '2',
			label: <span className={styles.tab}>Second Tab</span>,
			children: <SecondTab />,
		},
	];

	return (
		<div className={styles.adminContainer}>
			<div className={styles.formsContainer}>
				<Tabs
					className={styles.tabs}
					items={tabs}
					activeKey={activeKey}
					onChange={setActiveKey}
					size="large"
					tabPosition="top"
				/>
			</div>
		</div>
	);
};
