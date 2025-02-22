import { useCommonStore } from '@/store/common';
import { ExerciseType, useVocabularyStore } from '@/store/vocabulary-collection';
import {
	DEFAULT_DATA_TEST,
	EXERCISE_FORMATE,
} from '@/store/vocabulary-collection/useVocabularyStore';
import { WrapperCard } from '@/ui-components/Wrapper-card';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useVocabularyListData } from './hooks/useVocabularyListData';
import { ExerciseUI } from './components/exercise-content/ExerciseContent';
import { SelectingUI } from './components/selecting-formate-ui/SelectingUI';
import { useBeforeunload } from '@/shared/hooks/useBeforeunload';
import { Result } from '@/ui-components/Result';
import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { PaginationExercise } from './components/pagination/Pagination';
import styles from './vocabularyCard.module.css';

export const VocabularyCard = () => {
	const navigate = useNavigate();
	const { vocabulariesId = '', wordId = '' } = useParams();

	console.log('VOCABULARIES ID: ', vocabulariesId);
	console.log('WORD ID: ', wordId);

	const [isAutoNavigate, setIsAutoNavigate] = useState(false);
	const [task, setTask] = useState<ExerciseType>(DEFAULT_DATA_TEST);

	const fullExerciseScreen = useCommonStore.use.fullExerciseScreen();
	const exerciseListId = useVocabularyStore.use.exerciseListIds();
	const isDoneExercise = wordId === 'done' || exerciseListId.length === 0;
	const isSelectingFormate =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseFormate ===
		EXERCISE_FORMATE.isSelecting;

	const setFullScreen = useCommonStore.use.setFullScreen();
	const getExerciseById = useVocabularyStore.use.getExerciseById();
	const setExerciseListResponse = useVocabularyStore.use.setExerciseListResponse();
	const setExerciseListProgress = useVocabularyStore.use.setExerciseListProgress();
	const saveProgressToLocalStore = useVocabularyStore.use.saveProgressToLocalStore();
	const getProgressFromLocalStore = useVocabularyStore.use.getProgressFromLocalStore();

	console.log('vocabulariesId: ', vocabulariesId);
	console.log('wordId: ', wordId);

	useVocabularyListData(setExerciseListResponse, vocabulariesId);
	useBeforeunload(() => saveProgressToLocalStore(vocabulariesId));
	const onNavigate = useCallback(
		(id: string) => {
			navigate(`/vocabularies/${vocabulariesId}/word/${id}`);
		},
		[navigate, vocabulariesId],
	);

	console.log('TASK: ', task);

	useEffect(() => {
		if (wordId) {
			(async () => {
				const exercise = await getExerciseById(wordId);
				console.log('EXERCISE: ', exercise);
				if (exercise) setTask(exercise);
			})();
		}
	}, [wordId]);

	useEffect(() => {
		getProgressFromLocalStore(wordId);
		setIsAutoNavigate(false);

		return () => saveProgressToLocalStore(wordId);
	}, [wordId]);

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
						updateProgress={setExerciseListProgress}
					/>
				)}
				{!isDoneExercise && task && isSelectingFormate && (
					<SelectingUI
						key={vocabulariesId}
						task={task}
						setIsAutoNavigate={setIsAutoNavigate}
						setTask={setTask}
						updateProgress={setExerciseListProgress}
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
