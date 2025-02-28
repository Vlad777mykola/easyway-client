import { Pagination } from '@/shared/components/pagination-by-mode/Pagination';
import { EXERCISE_MODE, useDictionaryStore } from '@/store/dictionary';

export const PaginationExercise = ({
	taskId,
	isAutoNavigate,
	onNavigate,
}: {
	taskId: string;
	isAutoNavigate: boolean;
	onNavigate: (id: string) => void;
}) => {
	const exerciseListId = useDictionaryStore.use.exerciseListIds();
	const getExerciseProgressById = useDictionaryStore.use.getExerciseProgressById();
	const exerciseMode = useDictionaryStore.use.collectionsExerciseConfig().exerciseMode;
	const exerciseCorrectResponse =
		useDictionaryStore.use.collectionsExerciseConfig().exerciseCorrectResponse;

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
