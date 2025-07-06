import { DataWords } from '../components/main/CreateWords';
import { arrayOfHasRequiredKeys, dataWordsArraySchema } from '../zod-schemas/form.schema';
import { checkCorrectFormat } from './checkCorrectFormat';

export const correctParse = (merged: DataWords[], dataWords: DataWords[]) => {
	const parseCondition = dataWordsArraySchema.safeParse(merged);
	const parsedAllKeys = arrayOfHasRequiredKeys.safeParse(dataWords);
	const successParse = parsedAllKeys.success && parseCondition.success;
	const errors: string[] = [];

	if (!parsedAllKeys.success) {
		errors.push(checkCorrectFormat(parsedAllKeys));
	}

	if (!parseCondition.success) {
		errors.push(parseCondition.error.errors[0].message);
	}

	if (successParse) {
		return [];
	}

	return errors;
};
