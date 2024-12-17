import Layout from '@/layouts/main/Loyouts';
import Home from '@/pages/Home';
import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Profile = lazy(() => import('@/pages/Profile'));

export const routers = createBrowserRouter([
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
		],
	},
]);
