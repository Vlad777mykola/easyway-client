import { Outlet } from 'react-router-dom';
import { Navbar } from '../navbar';

const Layouts = () => (
	<div>
		<Navbar RightSide={<div>Menu</div>} LeftSide={<div>Menu</div>} />
		<main>
			<Outlet />
		</main>
		<footer>Footer Section</footer>
	</div>
);

export default Layouts;
