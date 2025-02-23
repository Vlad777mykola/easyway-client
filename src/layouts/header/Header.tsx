import { Menu } from '@/ui-components/Menu';
import { Navbar } from '@/shared/components/navbar';
import { NavHeader } from '@/shared/components/nav-header';
import { SideMenu } from './SideMenu';
import styles from './header.module.css';

const sideMenuItems = [
	// {
	// 	name: 'Home',
	// 	link: '/',
	// },
	{
		name: 'Collections',
		link: '/',
	},
	{
		name: 'Dictionary',
		link: '/dictionaries',
	},
];

const profileMenuItems = [
	{
		name: 'Profile',
		link: '/profile',
	},
	{
		name: 'Progress',
		link: '/',
	},
];

const Header = () => {
	return (
		<div className={styles.headersContainer}>
			<Navbar
				RightSide={
					<Menu
						side="right"
						icon="user"
						Items={
							<SideMenu
								img="https://imgcdn.stablediffusionweb.com/2024/3/24/17ee935b-c63a-4374-8fc3-91b2559e02f2.jpg"
								list={profileMenuItems}
								imgSpan="John Smith"
							/>
						}
					/>
				}
				LeftSide={<Menu side="left" Items={<SideMenu list={sideMenuItems} />} />}
			/>
			<NavHeader />
		</div>
	);
};

export default Header;
