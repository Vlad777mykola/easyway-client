import { CreateWordDto } from '@/shared/api/generated/model';

type Result = {
	uniqueWords: CreateWordDto[];
	errors: string;
};

export const checkSameItems = (fileItems: CreateWordDto[]) => {
	const sameItems: string[] = [];
	const result: Result = {
		uniqueWords: [],
		errors: '',
	};

	fileItems.forEach((item) => {
		if (!result.uniqueWords.some((unique) => unique.name === item.name)) {
			result.uniqueWords.push(item);
		} else {
			sameItems.push(item.name);
		}
	});

	if (sameItems.length > 0) {
		result.errors = `File has same word(s): ${sameItems.join(', ')}`;
	}

	return result;
};
