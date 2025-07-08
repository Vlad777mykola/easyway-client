import { DataWords } from '../components/main/CreateWords';
import { requiredKeys } from '../constants/constants';

export const filterFileData = (dataWord: DataWords[]) =>
	dataWord.filter((word: DataWords) => {
		return requiredKeys.every((key) => {
			const wordKey = word[key]?.replace(/\s+/g, '').split('');
			return (
				word[key] !== undefined &&
				word[key] !== null &&
				word[key] !== '' &&
				word[key].replace(/\s+/g, '').split('') &&
				wordKey?.every((symbol: string) => isNaN(Number(symbol)))
			);
		});
	});
