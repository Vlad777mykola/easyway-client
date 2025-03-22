const COMPLETED_TEST = 100;

export const calculateCompletionPercentage = (completedTasks: number, totalTasks: number) => {
	if (totalTasks === 0) return 0;
	return Math.round((completedTasks / totalTasks) * COMPLETED_TEST);
};

export const calculateTotalProgress = (examProgress: number, randomProgress: number) => {
	const totalProgress = (examProgress + randomProgress) / 2;
	return Math.ceil(totalProgress);
};
