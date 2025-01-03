import { ReactNode } from 'react';
import { List } from '@/shared/list';
import { DEFAULT_TEST } from '@/constants/data';

export const TaskList = (): ReactNode => {
	return (
		<>
			<List data={DEFAULT_TEST} />
		</>
	);
};
