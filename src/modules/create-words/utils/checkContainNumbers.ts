import { CreateWordDto } from '@/shared/api/generated/model';

type HasNumberData = {
	word: string;
	containNumbers: string[];
};

export const checkContainNumbers = (wordsData: CreateWordDto[]) => {
	let hasNumberData: HasNumberData[] = [];

	wordsData.forEach((word) => {
		Object.entries(word).forEach(([key, value]) => {
			const stringArr = value.replace(/\s+/g, '').split('');
			const noNumbers = stringArr.every((symbol: string) => isNaN(Number(symbol)));
			const dataHadThatWord = hasNumberData.find((data) => data.word === word.name);

			if (!noNumbers && !dataHadThatWord && key !== 'key') {
				hasNumberData.push({ word: word.name, containNumbers: [key] });
			}

			if (!noNumbers && dataHadThatWord && key !== 'key') {
				const filterData = hasNumberData.filter((data) => data.word !== dataHadThatWord.word);
				hasNumberData = [
					...filterData,
					{ ...dataHadThatWord, containNumbers: [...dataHadThatWord.containNumbers, key] },
				];
			}
		});
	});

	const correctWords = wordsData.filter((word) => {
		return hasNumberData.every((data) => data.word !== word.name);
	});

	const errors: string = hasNumberData
		.map((data) => `Word ${data.word} contain numbers in: ${data.containNumbers.join(', ')}.`)
		.join('\n');

	return { correctWords, errors };
};
