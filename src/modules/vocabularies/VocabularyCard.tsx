import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useCommonStore } from '@/store/common';
import { ExerciseType, useVocabularyStore } from '@/store/vocabulary-collection';
import {
	DEFAULT_DATA_TEST,
	EXERCISE_FORMATE,
	EXERCISE_MODE,
} from '@/store/vocabulary-collection/useVocabularyStore';
import { useVocabularyListData } from './hooks/useVocabularyListData';
import { useBeforeunload } from '@/shared/hooks/useBeforeunload';
import { useIndexedDB } from '@/shared/hooks/use-indexedDB';
import { useProgressStore } from '@/store/progress';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import { PaginationExercise } from './components/pagination/Pagination';
import styles from './vocabularyCard.module.css';

export const VocabularyCard = () => {
	const navigate = useNavigate();
	const { vocabulariesId = '', wordId = '' } = useParams();

	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const fullExerciseScreen = useCommonStore.use.fullExerciseScreen();
	const exerciseListId = useVocabularyStore.use.exerciseListIds();
	const isDoneExercise = wordId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;
	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);
	const setFullScreen = useCommonStore.use.setFullScreen();
	const getExerciseById = useVocabularyStore.use.getExerciseById();
	const setExerciseListResponse = useVocabularyStore.use.setExerciseListResponse();
	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();
	const saveProgressToLocalStore = useVocabularyStore.use.saveProgressToLocalStore();
	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();
	const getProgressFromLocalStore = useVocabularyStore.use.getProgressFromLocalStore();
	const setExamProgress = useProgressStore((store) => store.setExamProgress);
	const setRandomProgress = useProgressStore((store) => store.setRandomProgress);

	const setLatestTests = useProgressStore((store) => store.setLatestTests);

	const exerciseMode = useVocabularyStore((store) => store.collectionsExerciseConfig.exerciseMode);

	const correctResponse = useVocabularyStore(
		(store) => store.collectionsExerciseConfig.exerciseCorrectResponse,
	);

	const examProgress = useProgressStore((store) => store.examModeProgress);
	const randomProgress = useProgressStore((store) => store.randomModeProgress);
	const words = useVocabularyStore((store) => store.words);

	const exerciseCorrectResponse = useVocabularyStore(
		(store) => store.collectionsExerciseConfig.exerciseCorrectResponse,
	);

	const resultRandomWordID = randomProgress.progress.every(
		(item) => item.correctCount === correctResponse,
	);

	const resultExamWordID =
		examProgress.successProgress.length + examProgress.errorProgress.length === words.length;

	const store = useProgressStore((store) => store);

	console.log('STORE: ', store);

	const latestTests = useProgressStore((store) => store.latestTests);

	console.log('LATEST TEST: ', latestTests);

	let resultWordId;

	if (exerciseMode === EXERCISE_MODE.isExam) {
		resultWordId = resultExamWordID ? 'done' : wordId;
	}

	if (exerciseMode === EXERCISE_MODE.isRandom) {
		resultWordId = resultRandomWordID ? 'done' : wordId;
	}

	useIndexedDB(saveProgressToIndexedDB, 'save', vocabulariesId, resultWordId);
	// save progress on close browser
	useVocabularyListData(setExerciseListResponse, vocabulariesId);

	// clean all local store, only indexed db
	useBeforeunload(() => {
		saveProgressToLocalStore(vocabulariesId);
	});
	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/vocabularies/${vocabulariesId}/word/${id}`);
		},
		[navigate, vocabulariesId],
	);

	useEffect(() => {
		if (wordId) {
			(async () => {
				const exercise = await getExerciseById(wordId);
				if (exercise) setTask(exercise);
			})();
		}

		getProgressFromLocalStore(vocabulariesId);
		setIsAutoNavigate(false);

		return () => {
			saveProgressToLocalStore(vocabulariesId);
		};
	}, [wordId]);

	const setModesProgress = (id: string, isResolved: boolean) => {
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
			setExamProgress(id, isResolved);
		}
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
			setRandomProgress(id, isResolved, exerciseCorrectResponse);
		}
		setExerciseListProgress(id, isResolved);
		setLatestTests();
	};

	const navigateTestPage = () => {
		navigate(`/vocabularies/${vocabulariesId}`);
	};

	return (
		<WrapperCard fullScreen={fullExerciseScreen} setFullScreen={setFullScreen}>
			<div className={styles.taskContainer}>
				{isDoneExercise && (
					<Result
						icon={<Icon icon="smile" size="xl" />}
						title="Great, you have done all the exercise!"
						extra={
							<Button onClick={navigateTestPage} type="primary">
								Next
							</Button>
						}
					/>
				)}
				{!isDoneExercise && task && !isSelectingFormate && (
					<ExerciseUI
						key={vocabulariesId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setModesProgress}
					/>
				)}
				{!isDoneExercise && task && isSelectingFormate && (
					<SelectingUI
						key={vocabulariesId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setModesProgress}
					/>
				)}
				{!isDoneExercise && exerciseListId && (
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
