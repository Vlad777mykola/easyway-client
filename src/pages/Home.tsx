import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { TaskList } from '@/modules/task-list';

export const Home = () => {
	const { user } = useContext(UserContext);

	console.log('USER: ', user);

	return (
		<div>
			<TaskList />
		</div>
	);
};

export default Home;
