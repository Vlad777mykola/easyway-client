export const getRandomInteger = (current: number, maxNumber: number): number | undefined => {
	const minNumber = 0;
	const randomNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
	try {
		if (randomNumber === current) {
			return getRandomInteger(current, maxNumber);
		}
		if (maxNumber === minNumber) {
			throw new Error('Max number equal min number!');
		}
		return randomNumber;
	} catch (error) {
		console.error(error);
		return undefined;
	}
};
