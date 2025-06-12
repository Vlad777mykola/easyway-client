import { Pagination } from '@/features/pagination-by-mode';
import { EXERCISE_MODE, useExerciseProgressStore } from '@/store/exercise-progress';

export const PaginationExercise = ({
	taskId,
	isAutoNavigate,
	onNavigate,
}: {
	taskId: string;
	isAutoNavigate: boolean;
	onNavigate: (id: string) => void;
}) => {
	const exerciseListId = useExerciseProgressStore.use.exerciseListIds();
	const getExerciseProgressById = useExerciseProgressStore.use.getExerciseProgressById();
	const exerciseMode = useExerciseProgressStore.use.collectionsExerciseConfig().exerciseMode;
	const exerciseCorrectResponse =
		useExerciseProgressStore.use.collectionsExerciseConfig().exerciseCorrectResponse;

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
