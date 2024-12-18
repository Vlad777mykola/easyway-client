import { RouterProvider } from 'react-router-dom';
import { routers } from './router/Router';
import { ShrinkOutlined } from '@ant-design/icons';
import Icon from './ui-components/Icon/Icon';

export const App = () => {
	return (
		<>
			{/* <RouterProvider router={routers} /> */}
			<Icon size="xl" variant="primary" IconSVG={<ShrinkOutlined />} />
		</>
	);
};

export default App;
