import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { UserContext } from '@/context/UserContext';
import { TaskList } from '@/modules/task-list';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';
import styles from './home.module.css';

export const Home = () => {
	const { user } = useContext(UserContext);
	const navigate = useNavigate();

	const goBack = () => {
		navigate(-1);
	};

	console.log('USER: ', user);

	return (
		<>
			<div className={styles.buttonContainer}>
				<CircleButton onClick={goBack}>
					<Icon icon="left" />
				</CircleButton>
				<Breadcrumb
					items={[
						{
							href: '',
							title: <span>Home</span>,
						},
						{
							href: '/profile',
							title: <span>Profile</span>,
						},
						{
							title: 'EASYWAY',
						},
					]}
				/>
			</div>
			<TaskList />
		</>
	);
};

export default Home;
