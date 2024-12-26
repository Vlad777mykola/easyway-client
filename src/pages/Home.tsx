import { UserContext } from '@/context/UserContext';
import { useContext } from 'react';

export const Home = () => {
	const { user } = useContext(UserContext);

	console.log('USER: ', user);

	return <div>Home</div>;
};

export default Home;
