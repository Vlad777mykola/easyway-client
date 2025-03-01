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
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import { PaginationExercise } from './components/pagination/Pagination';
import { useBeforeunload } from '@/shared/hooks/useBeforeunload';
import styles from './vocabularyCard.module.css';
import { useProgressStore } from '@/store/progress';

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

	const examModeProgress = useProgressStore((state) => state.examModeProgress);

	const setFullScreen = useCommonStore.use.setFullScreen();
	const getExerciseById = useVocabularyStore.use.getExerciseById();
	const setExerciseListResponse = useVocabularyStore.use.setExerciseListResponse();
	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();
	const saveProgressToLocalStore = useVocabularyStore.use.saveProgressToLocalStore();
	const saveMyProgressToLocalStore = useProgressStore.use.saveProgressToLocalStore();
	const getProgressFromLocalStore = useVocabularyStore.use.getProgressFromLocalStore();

	const collectionsExerciseConfig = useVocabularyStore((store) => store.collectionsExerciseConfig);

	const store = useVocabularyStore((store) => store);

	const randomModeProgress = useProgressStore((store) => store.randomModeProgress);
	console.log('///RANDOM PROGRESS MODE VOCABULARY CARD: ', randomModeProgress);

	console.log('STORE: ', store);

	console.log('WORD ID: ', wordId);

	const setExamProgress = useProgressStore((store) => store.setExamProgress);
	const setRandomProgress = useProgressStore((store) => store.setRandomProgress);

	console.log('//vocabulariesId VOCABULARY CARD: ', vocabulariesId);

	useVocabularyListData(setExerciseListResponse, vocabulariesId);
	useBeforeunload(() => {
		saveProgressToLocalStore(vocabulariesId);
		saveMyProgressToLocalStore(vocabulariesId);
	});
	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/vocabularies/${vocabulariesId}/word/${id}`);
		},
		[navigate, vocabulariesId],
	);

	console.log('TASK: ', task);
	console.log('EXAM MODE PROGRESS: ', examModeProgress);

	useEffect(() => {
		if (wordId) {
			(async () => {
				const exercise = await getExerciseById(wordId);
				if (exercise) setTask(exercise);
			})();
		}
	}, [wordId]);

	useEffect(() => {
		getProgressFromLocalStore(vocabulariesId);
		setIsAutoNavigate(false);

		return () => {
			saveProgressToLocalStore(vocabulariesId);
			saveMyProgressToLocalStore(vocabulariesId);
		};
	}, [wordId]);

	const setModesProgress = (id: string, isResolved: boolean) => {
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isExam) {
			console.log('EXAM');
			setExamProgress(id, isResolved);
		}
		if (collectionsExerciseConfig.exerciseMode === EXERCISE_MODE.isRandom) {
			setRandomProgress(id, isResolved);
		}
		setExerciseListProgress(id, isResolved);
	};

	return (
		<WrapperCard fullScreen={fullExerciseScreen} setFullScreen={setFullScreen}>
			<div className={styles.taskContainer}>
				{isDoneExercise && (
					<Result
						icon={<Icon icon="smile" size="xl" />}
						title="Great, you have done all the exercise!"
						extra={
							<Button onClick={() => navigate(`/vocabularies/${vocabulariesId}`)} type="primary">
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
