import { ReactNode } from 'react';
import { List } from '@/shared/components/list/List';
import { DEFAULT_TASKS } from '@/shared/constants/data';
import { useNavigate, useParams } from 'react-router-dom';

export const TaskList = (): ReactNode => {
	const navigate = useNavigate();
	const { collectionsId = '' } = useParams();
	const onClick = (id: string) => {
		navigate(`/collections/${collectionsId}/task/${id}`);
	};

	return (
		<>
			<List data={DEFAULT_TASKS} onClick={onClick} />
		</>
	);
};
