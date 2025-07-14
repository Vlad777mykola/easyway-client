import { CreateWordDto } from '@/shared/api/generated/model';
import { WORD_FIELDS } from '../constants/constants';

type Result = {
	correctWords: CreateWordDto[];
	errors: string[];
};

export const containAllKeys = (xmlWords: CreateWordDto[]) => {
	const emptyFieldsMap = new Map<string, string[]>();
	const result: Result = {
		correctWords: [],
		errors: [],
	};

	xmlWords.forEach((word) => {
		const missingFields: string[] = [];

		WORD_FIELDS.forEach((field) => {
			if (!word[field] || word[field].length === 0) {
				missingFields.push(field);
			}
		});

		if (missingFields.length > 0) {
			const name = word.name || '(no name)';
			emptyFieldsMap.set(name, missingFields);
		} else {
			result.correctWords.push(word);
		}
	});

	if (emptyFieldsMap.size > 0) {
		const errors = Array.from(emptyFieldsMap.entries()).map(([name, fields]) => {
			return `Empty key in ${name}: ${fields.join(', ')}.`;
		});
		result.errors.push(...errors);
	}

	return result;
};
