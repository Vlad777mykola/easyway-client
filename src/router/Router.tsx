import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/main/Layouts';
import { Auth } from '@/pages/Auth';
import Profile from '@/pages/Profile';
import Home from '@/pages/Home';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <Home />,
			},
			{
				path: 'profile',
				element: <Profile />,
			},
			{
				path: 'login',
				element: <Auth />,
			},
			{
				path: 'signup',
				element: <Auth />,
			},
		],
	},
]);
