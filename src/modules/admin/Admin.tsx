import { useState } from 'react';
import { Tabs } from '@/ui-components/Tabs';
import { Typography } from '@/ui-components/Typography';
import { WrapperCard } from '@/features/wrapper-card';

import { FormFilters } from './components/form-filters/FormFilters';
import { SecondTab } from './components/second-tab/SecondTab';

export const Admin = () => {
	const [activeKey, setActiveKey] = useState('1');

	const tabs = [
		{
			key: '1',
			label: <Typography.Title level={5}>Filters</Typography.Title>,
			children: <FormFilters />,
		},
		{
			key: '2',
			label: <Typography.Title level={5}>Second</Typography.Title>,
			children: <SecondTab />,
		},
	];

	return (
		<WrapperCard>
			<Tabs
				items={tabs}
				activeKey={activeKey}
				onChange={setActiveKey}
				size="large"
				tabPosition="top"
			/>
		</WrapperCard>
	);
};
