/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import Layout from '@/layouts/main/Layouts';
import { Auth } from '@/pages/Auth';
import Home from '@/pages/Home';
import { createBrowserRouter } from 'react-router-dom';
import { CreateTest } from '@/pages/CreateTest';

const Profile = lazy(() => import('@/pages/Profile'));

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
			{
				path: 'test',
				element: <CreateTest />,
			},
		],
	},
]);
