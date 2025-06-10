import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExerciseType, useVocabularyStore } from '@/store/vocabulary-collection';
import { useVocabularyListData } from './hooks/useVocabularyListData';
import { useProgressStore } from '@/store/progress';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { PaginationExercise } from './components/pagination/Pagination';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import {
	DEFAULT_DATA_TEST,
	EXERCISE_FORMATE,
	EXERCISE_MODE,
} from '@/store/vocabulary-collection/constants';
import { saveProgress } from '@/shared/utils/progress/saveProgress';
import { DoneCard } from '@/shared/components/done-card';
import { SelectFormate } from './components/select-formate/SelectFormate';
import styles from './vocabularyCard.module.css';

export const VocabularyCard = () => {
	const navigate = useNavigate();
	const { vocabulariesId = '', wordId = '' } = useParams();
	const ID_VOCABULARY_EXERCISE = `${vocabulariesId}_vocabulary`;

	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);
	const [testIsDone, setTestIsDone] = useState<boolean>();
	console.log(setTestIsDone);
	const exerciseListId = useVocabularyStore.use.exerciseListIds();
	const isSelectingFormate =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;
	const collectionsExerciseConfig = useVocabularyStore.use.collectionsExerciseConfig();
	const exerciseCorrectResponse =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseCorrectResponse;
	// const words = useVocabularyStore.use.words();
	// const examModeProgress = useProgressStore.use.examModeProgress();
	// const randomModeProgress = useProgressStore.use.randomModeProgress();
	// const examIsDone = examModeProgress.successProgress.length === words.length;
	// const random =
	// 	randomModeProgress.resolved.every((item) => item.isDone === true) &&
	// 	randomModeProgress.resolved.length === words.length;
	const isAutoPlay = useVocabularyStore.use.collectionsExerciseConfig().autoPlay;

	const exerciseListProgress = useVocabularyStore.use.exerciseListProgress();

	const getExerciseById = useVocabularyStore.use.getExerciseById();
	const setExerciseListResponse = useVocabularyStore.use.setExerciseListResponse();
	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();
	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();
	const setExamProgress = useProgressStore.use.setExamProgress();
	const setRandomProgress = useProgressStore.use.setRandomProgress();
	const setTakenTestCount = useProgressStore.use.setTakenTestCount();

	useBeforeunload(() =>
		saveProgress(saveProgressToIndexedDB, ID_VOCABULARY_EXERCISE, exerciseListProgress),
	);

	// useEffect(() => {
	// 	if (collectionsExerciseConfig.exerciseMode === 'randomMode') {
	// 		setTestIsDone(random);
	// 	}

	// 	if (collectionsExerciseConfig.exerciseMode === 'examMode') {
	// 		setTestIsDone(examIsDone);
	// 	}
	// }, []);

	useVocabularyListData(setExerciseListResponse, vocabulariesId);

	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/vocabularies/${vocabulariesId}/word/${id}`);
		},
		[navigate, vocabulariesId],
	);

	const navigateToDictionary = useCallback(
		() => navigate(`/vocabularies/${vocabulariesId}`),
		[navigate, vocabulariesId],
	);

	useEffect(() => {
		if (wordId) {
			(async () => {
				const exercise = await getExerciseById(wordId);
				if (exercise) setTask(exercise);
			})();
		}

		setIsAutoNavigate(false);

		return () => {
			saveProgress(saveProgressToIndexedDB, ID_VOCABULARY_EXERCISE, exerciseListProgress);
		};
	}, [
		wordId,
		ID_VOCABULARY_EXERCISE,
		exerciseListProgress,
		getExerciseById,
		saveProgressToIndexedDB,
	]);

	const setModesProgress = async (id: string, isResolved: boolean) => {
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
			setExamProgress(id, isResolved);
		}
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
			setRandomProgress(id, isResolved, exerciseCorrectResponse);
		}

		setExerciseListProgress(id, isResolved);
		setTakenTestCount();
	};

	return (
		<WrapperCard id={wordId} goBack={() => navigateToDictionary()}>
			<div className={styles.taskContainer}>
				{testIsDone && <DoneCard onClick={() => navigateToDictionary()} />}
				{!testIsDone && task && !isSelectingFormate && (
					<SelectFormate
						isSelectingFormate={isSelectingFormate}
						key={vocabulariesId}
						task={task}
						setTask={setTask}
						setIsAutoNavigate={setIsAutoNavigate}
						updateProgress={setModesProgress}
						isAutoPlay={isAutoPlay}
					/>
				)}
				{!testIsDone && exerciseListId && (
					<PaginationExercise
						taskId={wordId}
						isAutoNavigate={isAutoNavigate}
						onNavigate={(id: string) => onNavigate(id)}
					/>
				)}
			</div>
		</WrapperCard>
	);
};
