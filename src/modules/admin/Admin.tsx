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
			label: 'Filters',
			children: <FormFilters />,
		},
		{
			key: '2',
			label: 'Second Tab',
			children: <SecondTab />,
		},
	];

	return (
		<div className={styles.adminContainer}>
			{/* <div className={styles.formsContainer}>
				<FormTabs>
					<FormTab label="Filters">
						<FormFilters />
					</FormTab>

					<FormTab label="Second Tab">
						<SecondTab />
					</FormTab>
				</FormTabs>
			</div> */}
			<div className={styles.formsContainer}>
				<Tabs
					items={tabs}
					activeKey={activeKey}
					onChange={setActiveKey}
					size="large"
					tabPosition="left"
				/>
			</div>
		</div>
	);
};
