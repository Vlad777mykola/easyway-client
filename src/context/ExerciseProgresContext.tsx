import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

type ExerciseDataType = {
	countAllAnswers: number;
	allProgressExercise: {
		exerciseId: string;
		countCorrectAnswers: number;
	}[];
};
const progressAllExerciseData = {
	exerciseId: '',
	countCorrectAnswers: 0,
};
const ExerciseProgressData = {
	countAllAnswers: 0,
	allProgressExercise: [progressAllExerciseData],
};

type ExerciseContextType = {
	exerciseProgress: ExerciseDataType;
	setExerciseProgress: Dispatch<SetStateAction<ExerciseDataType>>;
};

const ExerciseContext = createContext<ExerciseContextType>({
	exerciseProgress: ExerciseProgressData,
	setExerciseProgress: () => {},
});

const ExerciseProvider = ({ children }: { children: ReactNode }) => {
	const [exerciseProgress, setExerciseProgress] = useState<ExerciseDataType>(ExerciseProgressData);

	return (
		<ExerciseContext.Provider value={{ exerciseProgress, setExerciseProgress }}>
			{children}
		</ExerciseContext.Provider>
	);
};

export { ExerciseContext, ExerciseProvider };
