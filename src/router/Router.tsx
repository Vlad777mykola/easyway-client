import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/main/Layouts';
import { DictionaryExerciseCard, DictionaryExerciseDetails } from '@/modules/dictionary';
// import { Auth } from '@/pages/Auth';
// import Home from '@/pages/Home';

const CreateTest = lazy(() => import('@/pages/CreateTest'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const CompleteTest = lazy(() => import('@/pages/CompleteTest'));
const DictionaryPage = lazy(() => import('@/pages/DictionaryPage'));

const CollectionsPage = lazy(() => import('@/pages/CollectionsPage'));
const ExerciseDetails = lazy(() => import('@/pages/ExerciseDetailsPage'));

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

			{ path: 'dictionaries', element: <DictionaryPage /> },
			{ path: 'dictionaries/:dictionaryId', element: <DictionaryExerciseDetails /> },
			{
				path: 'dictionaries/:dictionaryId/word/:wordId',
				element: <DictionaryExerciseCard />,
			},

			{ path: 'collections', element: <CollectionsPage /> },
			{ path: 'collections/:collectionsId', element: <ExerciseDetails /> },
			{ path: 'collections/:collectionsId/task/:taskId', element: <CompleteTest /> },
		],
	},
]);
