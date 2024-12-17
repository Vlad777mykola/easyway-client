import { Outlet } from 'react-router-dom';

const Layout = () => (
	<div>
		<header>Header Section</header>
		<main>
			<Outlet />
		</main>
		<footer>Footer Section</footer>
	</div>
);

export default Layout;
