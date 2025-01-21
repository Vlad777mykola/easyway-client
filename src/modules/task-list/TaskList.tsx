import { ReactNode } from 'react';
import { List } from '@/shared/components/list/List';
import { DEFAULT_TASKS } from '@/shared/constants/data';

export const TaskList = (): ReactNode => {
	return (
		<>
			<List data={DEFAULT_TASKS} />
		</>
	);
};
