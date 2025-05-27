import { router } from '@/router/Router';
import { Menu } from '@/ui-components/Menu';
import { useAuthData } from '@/context/auth';
import { Navbar } from '@/shared/components/navbar';
import { NavHeader } from '@/shared/components/nav-header';
import { SideMenu } from './components/side-menu/SideMenu';
import { profileMenuItems, sideMenuItems } from './constants';

import styles from './header.module.css';

const Header = () => {
	const { isLogIn } = useAuthData();
	return (
		<div className={styles.headersContainer}>
			<Navbar
				RightSide={
					<Menu
						side="right"
						icon="user"
						text={isLogIn ? '' : 'Sing in'}
						overrideOnClick={isLogIn ? undefined : () => router.navigate('/signin')}
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
