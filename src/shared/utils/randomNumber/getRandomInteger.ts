export const getRandomInteger = (minNumber = 0, maxNumber: number, current: number): number => {
	const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
	if (randomNumber === current) {
		return getRandomInteger(minNumber, maxNumber, current);
	}
	return randomNumber;
};
