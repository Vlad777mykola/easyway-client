import { useContext } from 'react';
import { UserContext } from '@/context/UserContext';
import { TaskList } from '@/modules/task-list';

export const Home = () => {
	const { user } = useContext(UserContext);

	console.log('USER: ', user);

	return <TaskList />;
};

export default Home;
