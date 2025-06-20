import { useState } from 'react';
import { Tabs } from '@/ui-components/Tabs';
import { Typography } from '@/ui-components/Typography';
import { WrapperCard } from '@/features/wrap-card';

import { FormFilters } from './components/form-filters/FormFilters';
import CreateWords from '../create-words';
/* import { SecondTab } from './components/second-tab/SecondTab'; */

export const Admin = () => {
	const [activeKey, setActiveKey] = useState('2');

	const tabs = [
		{
			key: '1',
			label: <Typography.Title level={5}>Filters</Typography.Title>,
			children: <FormFilters />,
		},
		{
			key: '2',
			label: <Typography.Title level={5}>Word</Typography.Title>,
			children: <CreateWords />,
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
