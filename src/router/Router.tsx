import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from '@/layouts/main/Layouts';
import { DictionaryExerciseCard, DictionaryExerciseDetails } from '@/modules/dictionary';
// import { Auth } from '@/pages/Auth';
// import Home from '@/pages/Home';

const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const CompleteTest = lazy(() => import('@/pages/CompleteTest'));
const DictionaryPage = lazy(() => import('@/pages/DictionaryPage'));

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
			{ path: '', element: <CollectionsPage /> },

			{ path: 'collections', element: <CollectionsPage /> },
			{ path: 'collections/:collectionsId', element: <ExerciseDetails /> },
			{ path: 'collections/:collectionsId/task/:taskId', element: <CompleteTest /> },

			{ path: 'vocabularies', element: <VocabulariesPage /> },
			{ path: 'vocabularies/:vocabulariesId', element: <WordDetailsPage /> },
			{ path: 'vocabularies/:vocabulariesId/word/:wordId', element: <CompleteWordTest /> },

			{ path: 'dictionaries', element: <DictionaryPage /> },
			{ path: 'dictionaries/:dictionaryId', element: <DictionaryExerciseDetails /> },
			{
				path: 'dictionaries/:dictionaryId/word/:wordId',
				element: <DictionaryExerciseCard />,
			},
		],
	},
]);
