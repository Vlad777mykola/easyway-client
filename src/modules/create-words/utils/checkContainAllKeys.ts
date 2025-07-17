import { CreateWordDto } from '@/shared/api/generated/model';
import { requiredKeys } from '../constants/constants';

type Result = {
	correctWords: CreateWordDto[];
	errors: string[];
};

export const checkContainAllKeys = (fileWords: CreateWordDto[]) => {
	const emptyFieldsMap = new Map<string, string[]>();
	const result: Result = {
		correctWords: [],
		errors: [],
	};

	fileWords.forEach((word) => {
		const missingFields: string[] = [];

		requiredKeys.forEach((field) => {
			if ((!word[field] || word[field].length < 3) && field !== 'variants') {
				missingFields.push(field);
			}

			if (
				field === 'variants' &&
				!word[field] &&
				(word[field].length === 0 || word[field].split(', ').some((item) => item.length < 3))
			) {
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
		result.errors.push(...errors, 'Every item must contain minimum three symbols.');
	}

	return result;
};
