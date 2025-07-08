import { CreateWordDto } from '@/shared/api/generated/model';
// import { requiredKeys } from '../constants/constants';

export const filterFileData = (dataWord: CreateWordDto[]) =>
	dataWord.filter((word: CreateWordDto) => {
		console.log(word);
		// return requiredKeys.every((key) => {
		// 	const wordKey = word[key]?.replace(/\s+/g, '').split('');
		// 	return (
		// 		word[key] !== undefined &&
		// 		word[key] !== null &&
		// 		word[key] !== '' &&
		// 		word[key].replace(/\s+/g, '').split('') &&
		// 		wordKey?.every((symbol: string) => isNaN(Number(symbol)))
		// 	);
		// });
	});
