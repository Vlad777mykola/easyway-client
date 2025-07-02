import { SafeParseError } from 'zod';
import { requiredKeys } from '../constants/constants';

export const checkCorrectFormat = (parseSchema: SafeParseError<Record<string, string>[]>) => {
	let errorCheck: string = '';

	for (const value of Object.values(parseSchema.error.format())) {
		if (typeof value === 'object' && value && !Array.isArray(value)) {
			for (const key of requiredKeys) {
				const errorField = value[key];
				if (errorField && typeof errorField === 'object' && Array.isArray(errorField._errors)) {
					errorCheck += ` ${errorField._errors.join(' ')}`;
				}
			}
		}
	}

	return errorCheck;
};
