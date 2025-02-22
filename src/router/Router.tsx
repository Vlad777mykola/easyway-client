import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/main/Layouts';
// import { Auth } from '@/pages/Auth';
// import Home from '@/pages/Home';

const CreateTest = lazy(() => import('@/pages/CreateTest'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const CompleteTest = lazy(() => import('@/pages/CompleteTest'));
const CollectionsPage = lazy(() => import('@/pages/CollectionsPage'));
const VocabulariesPage = lazy(() => import('@/pages/VocabulariesPage'));
const ExerciseDetails = lazy(() => import('@/pages/ExerciseDetailsPage'));
const WordDetailsPage = lazy(() => import('@/pages/WordDetailsPage'));
const CompleteWordTest = lazy(() => import('@/pages/CompleteWordTest'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			// { path: '', element: <Home /> },
			{ path: 'profile', element: <ProfilePage /> },
			// { path: 'login', element: <Auth /> },
			// { path: 'signup', element: <Auth /> },
			{ path: 'test', element: <CreateTest /> },
			{ path: '', element: <CollectionsPage /> },
			{ path: 'collections', element: <CollectionsPage /> },
			{ path: 'complete-test', element: <CompleteTest /> },
			{ path: 'vocabularies', element: <VocabulariesPage /> },
			{ path: 'collections/:collectionsId', element: <ExerciseDetails /> },
			{ path: 'collections/:collectionsId/task/:taskId', element: <CompleteTest /> },
			{ path: 'vocabularies/:vocabulariesId', element: <WordDetailsPage /> },
			{ path: 'vocabularies/:vocabulariesId/word/:wordId', element: <CompleteWordTest /> },
		],
	},
]);
