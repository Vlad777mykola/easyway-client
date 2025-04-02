import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ExerciseType, useVocabularyStore } from '@/store/vocabulary-collection';
import { useVocabularyListData } from './hooks/useVocabularyListData';
import { useProgressStore } from '@/store/progress';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';
import { PaginationExercise } from './components/pagination/Pagination';
import { saveVocabularyProgress } from './utils/saveVocabularyProgress';
import { useBeforeunload } from '@/shared/hooks/use-before-unload/useBeforeunload';
import styles from './vocabularyCard.module.css';
import {
	DEFAULT_DATA_TEST,
	EXERCISE_FORMATE,
	EXERCISE_MODE,
} from '@/store/vocabulary-collection/constants';
import { ExerciseUI } from '@/shared/components/exercise-content/ExerciseContent';
import { SelectingUI } from '@/shared/components/selecting-formate-ui/SelectingUI';

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
	const collectionsExerciseConfig = useVocabularyStore.use.collectionsExerciseConfig();
	const exerciseCorrectResponse =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseCorrectResponse;
	const words = useVocabularyStore.use.words();
	const examModeProgress = useProgressStore.use.examModeProgress();
	const randomModeProgress = useProgressStore.use.randomModeProgress();
	const examIsDone = examModeProgress.successProgress.length === words.length;
	const random =
		randomModeProgress.resolved.every((item) => item.isDone === true) &&
		randomModeProgress.resolved.length === words.length;
	const isAutoPlay = useVocabularyStore.use.collectionsExerciseConfig().autoPlay;
	const getExerciseById = useVocabularyStore.use.getExerciseById();
	const setExerciseListResponse = useVocabularyStore.use.setExerciseListResponse();
	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();
	const saveProgressToIndexedDB = useProgressStore.use.saveProgressToIndexedDB();
	const setExamProgress = useProgressStore.use.setExamProgress();
	const setRandomProgress = useProgressStore.use.setRandomProgress();
	const setTakenTestCount = useProgressStore.use.setTakenTestCount();

	useBeforeunload(() =>
		saveVocabularyProgress(saveProgressToIndexedDB, `${vocabulariesId}_vocabulary`),
	);

	useEffect(() => {
		if (collectionsExerciseConfig.exerciseMode === 'randomMode') {
			setTestIsDone(random);
		}

		if (collectionsExerciseConfig.exerciseMode === 'examMode') {
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
			saveVocabularyProgress(saveProgressToIndexedDB, `${vocabulariesId}_vocabulary`);
		};
	}, [wordId]);

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
						isAutoPlay={isAutoPlay}
						isSelectingFormate={isSelectingFormate}
					/>
				)}
				{!testIsDone && task && isSelectingFormate && (
					<SelectingUI
						key={vocabulariesId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
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
