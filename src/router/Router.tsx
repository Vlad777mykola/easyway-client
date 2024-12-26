import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/main/Layouts';
import { Auth } from '@/pages/Auth';
import Home from '@/pages/Home';

const Profile = lazy(() => import('@/pages/Profile'));
const CreateTest = lazy(() => import('@/pages/CreateTest'));
const CompleteTest = lazy(() => import('@/pages/CompleteTest'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '', element: <Home /> },
			{ path: 'profile', element: <Profile /> },
			{ path: 'login', element: <Auth /> },
			{ path: 'signup', element: <Auth /> },
			{ path: 'test', element: <CreateTest /> },
			{ path: 'complete-test', element: <CompleteTest /> },
		],
	},
]);
