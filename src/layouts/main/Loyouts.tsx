import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar';

const Layout = () => (
	<div>
		<Navbar />
		<main>
			<Outlet />
		</main>
		<footer>Footer Section</footer>
	</div>
);

export default Layout;
