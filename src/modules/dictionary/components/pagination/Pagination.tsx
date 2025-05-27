import { Pagination } from '@/shared/components/pagination-by-mode/Pagination';
import { EXERCISE_MODE, useDictionaryStore } from '@/store/dictionary';
import { useConfigStings } from '../../hooks/useConfigParamWithDefaultData';

export const PaginationExercise = ({
	taskId,
	isAutoNavigate,
	onNavigate,
}: {
	taskId: string;
	isAutoNavigate: boolean;
	onNavigate: (id: string) => void;
}) => {
	const { getMode, getTotalCorrectResponse } = useConfigStings();
	const exerciseListId = useDictionaryStore.use.exerciseListResponse().map((i) => i.id);
	const exerciseMode = getMode();
	const exerciseCorrectResponse = getTotalCorrectResponse() as number;
	console.log(exerciseCorrectResponse, exerciseMode);
	return (
		<>
			{exerciseMode === EXERCISE_MODE.Exam && (
				<Pagination
					ids={exerciseListId}
					exerciseMode={exerciseMode}
					currentId={taskId}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
				/>
			)}
			{exerciseMode === EXERCISE_MODE.Infinitive && (
				<Pagination
					ids={exerciseListId}
					exerciseMode={exerciseMode}
					currentId={taskId}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
				/>
			)}
			{exerciseMode === EXERCISE_MODE.Random && (
				<Pagination
					ids={exerciseListId}
					exerciseMode={exerciseMode}
					currentId={taskId}
					isAutoNavigate={isAutoNavigate}
					navigateTo={(id: string) => onNavigate(id)}
					totalCount={exerciseCorrectResponse}
					filledCount={1}
				/>
			)}
		</>
	);
};
