import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExerciseType, useVocabularyStore } from '@/store/vocabulary-collection';
import {
	DEFAULT_DATA_TEST,
	EXERCISE_FORMATE,
	EXERCISE_MODE,
} from '@/store/vocabulary-collection/useVocabularyStore';
import { useVocabularyListData } from './hooks/useVocabularyListData';
import { useProgressStore } from '@/store/progress';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import { PaginationExercise } from './components/pagination/Pagination';
import { saveVocabularyProgress } from './utils/saveVocabularyProgress';
import styles from './vocabularyCard.module.css';

export const VocabularyCard = () => {
	const navigate = useNavigate();
	const { vocabulariesId = '', wordId = '' } = useParams();

	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);
	const [testIsDone, setTestIsDone] = useState<boolean>();

	const exerciseListId = useVocabularyStore.use.exerciseListIds();
	const isSelectingFormate =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;
	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);
	const exerciseCorrectResponse = useVocabularyStore(
		(store) => store.collectionsExerciseConfig.exerciseCorrectResponse,
	);
	const store = useProgressStore((store) => store);
	const vocabularyStore = useVocabularyStore((store) => store);
	const examIsDone = store.examModeProgress.successProgress.length === vocabularyStore.words.length;
	const randomIsDone =
		store.randomModeProgress.resolved.every((item) => item.isDone === true) &&
		store.randomModeProgress.resolved.length === vocabularyStore.words.length;
	const getExerciseById = useVocabularyStore.use.getExerciseById();
	const setExerciseListResponse = useVocabularyStore.use.setExerciseListResponse();
	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();
	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();
	const setExamProgress = useProgressStore((store) => store.setExamProgress);
	const setRandomProgress = useProgressStore((store) => store.setRandomProgress);
	const setLatestTests = useProgressStore((store) => store.setLatestTests);

	useEffect(() => {
		if (vocabularyStore.collectionsExerciseConfig.exerciseMode === 'randomMode') {
			setTestIsDone(randomIsDone);
		}

		if (vocabularyStore.collectionsExerciseConfig.exerciseMode === 'examMode') {
			setTestIsDone(examIsDone);
		}
	}, []);

	useVocabularyListData(setExerciseListResponse, vocabulariesId);

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

		setIsAutoNavigate(false);

		return () => {
			saveVocabularyProgress(saveProgressToIndexedDB, vocabulariesId);
		};
	}, [wordId]);

	const setModesProgress = async (id: string, isResolved: boolean) => {
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
			setExamProgress(id, isResolved);
		}
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
			setRandomProgress(id, isResolved, exerciseCorrectResponse);
		}
		await saveVocabularyProgress(saveProgressToIndexedDB, vocabulariesId);
		setExerciseListProgress(id, isResolved);
		setLatestTests();
	};

	const navigateTestPage = () => {
		navigate(`/vocabularies/${vocabulariesId}`);
	};

	return (
		<WrapperCard id={wordId} goBack={() => navigate(`/collections/${vocabulariesId}`)}>
			<div className={styles.taskContainer}>
				{testIsDone && (
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
				{!testIsDone && task && !isSelectingFormate && (
					<ExerciseUI
						key={vocabulariesId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setModesProgress}
					/>
				)}
				{!testIsDone && task && isSelectingFormate && (
					<SelectingUI
						key={vocabulariesId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setModesProgress}
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
