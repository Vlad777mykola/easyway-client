/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react';
import { ROUTES } from '@/shared/model/routes';
import { createBrowserRouter } from 'react-router-dom';
// import { DictionaryExerciseCard, DictionaryExerciseDetails } from '@/modules/dictionary';
import { Auth } from '@/pages/Auth';

const Layout = lazy(() => import('@/layouts/main/Layouts'));
const ProfilePage = lazy(() => import('@/pages/ProfilePage'));
const ProgressPage = lazy(() => import('@/pages/ProgressPage'));
const CompleteTest = lazy(() => import('@/pages/CompleteTest'));
const DictionaryPage = lazy(() => import('@/pages/DictionaryPage'));

const CreateCollections = lazy(() => import('@/modules/create-collections'));
const ExercisesPage = lazy(() => import('@/pages/ExercisesPage'));
const VocabulariesPage = lazy(() => import('@/pages/VocabulariesPage'));
const ExerciseDetails = lazy(() => import('@/pages/ExerciseDetailsPage'));
const WordDetailsPage = lazy(() => import('@/pages/WordDetailsPage'));
const CompleteWordTest = lazy(() => import('@/pages/CompleteWordTest'));

const WordCardPage = lazy(() => import('@/pages/WordCardPage'));

//const AdminPage = lazy(() => import('@/pages/AdminPage'));

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '', lazy: () => import('@/pages/Dictionary.page') },
			{
				path: ROUTES.ADMIN,
				lazy: () => import('@/pages/Admin.page'),
			},
			{ path: 'profile', element: <ProfilePage /> },
			{ path: 'signin', element: <Auth isSignup={true} /> },
			{ path: 'signup', element: <Auth /> },

			{ path: 'create/collection', element: <CreateCollections /> },

			{ path: 'exercises', element: <ExercisesPage /> },
			{ path: 'exercises/:exercisesId', element: <ExerciseDetails /> },
			{ path: 'exercises/:exercisesId/word/:taskId', element: <CompleteTest /> },

			{ path: 'vocabularies', element: <VocabulariesPage /> },
			{ path: 'vocabularies/:vocabulariesId', element: <WordDetailsPage /> },
			{ path: 'vocabularies/:vocabulariesId/word/:wordId', element: <CompleteWordTest /> },

			{ path: 'dictionaries', element: <DictionaryPage /> },
			// { path: 'dictionaries/:dictionaryId', element: <DictionaryExerciseDetails /> },
			// {
			// 	path: 'dictionaries/:dictionaryId/word/:wordId',
			// 	element: <DictionaryExerciseCard />,
			// },

			{ path: 'progress', element: <ProgressPage /> },

			// { path: 'admin', element: <AdminPage /> },

			{ path: 'word/:wordName/:wordId', element: <WordCardPage /> },
		],
	},
]);
