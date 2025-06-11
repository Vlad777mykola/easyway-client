import { Pagination } from '@/features/pagination-by-mode/Pagination';
import { EXERCISE_MODE, useVocabularyStore } from '@/store/vocabulary-collection';

export const PaginationExercise = ({
	taskId,
	isAutoNavigate,
	onNavigate,
}: {
	taskId: string;
	isAutoNavigate: boolean;
	onNavigate: (id: string) => void;
}) => {
	const exerciseListId = useVocabularyStore.use.exerciseListIds();
	const getExerciseProgressById = useVocabularyStore.use.getExerciseProgressById();
	const exerciseMode = useVocabularyStore.use.collectionsExerciseConfig().exerciseMode;
	const exerciseCorrectResponse =
		useVocabularyStore.use.collectionsExerciseConfig().exerciseCorrectResponse;

	return (
		<>
			{exerciseMode === EXERCISE_MODE.isExam && (
				<Pagination
					ids={exerciseListId}
					exerciseMode={exerciseMode}
					currentId={taskId}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
				/>
			)}
			{exerciseMode === EXERCISE_MODE.isInfinitive && (
				<Pagination
					ids={exerciseListId}
					exerciseMode={exerciseMode}
					currentId={taskId}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
				/>
			)}
			{exerciseMode === EXERCISE_MODE.isRandom && (
				<Pagination
					ids={exerciseListId}
					exerciseMode={exerciseMode}
					currentId={taskId}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
					totalCount={exerciseCorrectResponse}
					filledCount={getExerciseProgressById(taskId) || 0}
				/>
			)}
		</>
	);
};
