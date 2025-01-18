export const getRandomInteger = (current: number, maxNumber: number, minNumber = 0): number => {
	const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
	if (minNumber === maxNumber || minNumber > maxNumber) {
		return minNumber;
	}
	if (randomNumber === current) {
		return getRandomInteger(current, maxNumber, minNumber);
	}
	return randomNumber;
};
