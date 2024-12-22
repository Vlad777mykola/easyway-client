import { UserContext } from '@/context/UserContext';
import { useGetUser } from '@/modules/auth/hooks/useGetUser';
import { Button } from '@/ui-components/Button';
import { useContext } from 'react';

export const Home = () => {
	const { user, setUser } = useContext(UserContext);
	const { data } = useGetUser();

	console.log('USER: ', user);

	return (
		<div>
			Home
			<Button onClick={() => setUser(data)}>Create User</Button>
		</div>
	);
};

export default Home;
