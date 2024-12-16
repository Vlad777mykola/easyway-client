import { RouterProvider } from 'react-router-dom';
import { routers } from './router/Router';

export const App = () => {
	return (
		<>
			<RouterProvider router={routers} />
		</>
	);
};

export default App;
