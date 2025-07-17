import type { Dispatch, SetStateAction } from 'react';
import { type CreateWordDto } from '@/shared/api/generated/model';
import { checkContainAllKeys } from './checkContainAllKeys';
import { checkContainNumbers } from './checkContainNumbers';
import { checkFileDublicates } from './checkFileDublicates';
import { checkSameItems } from './checkSameItems';

export const checkCorrectData = (
	items: CreateWordDto[],
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>,
) => {
	let errors: string[] = [];
	const fullKeysWord = checkContainAllKeys(items);
	if (fullKeysWord.errors.length > 0) errors.push(fullKeysWord.errors.join(' '));

	const uniqueItems = checkSameItems(fullKeysWord.correctWords);
	if (uniqueItems.errors !== '') errors.push(uniqueItems.errors);

	const hasNumbers = checkContainNumbers(uniqueItems.uniqueWords);
	if (hasNumbers.errors !== '') errors.push(hasNumbers.errors);

	const error = checkFileDublicates(hasNumbers.correctWords, setTableWords);

	if (error !== '') errors.push(error);

	const noErrors =
		error === '' &&
		uniqueItems.errors === '' &&
		fullKeysWord.errors.length === 0 &&
		hasNumbers.errors === '';

	if (noErrors) {
		errors = [];
	}

	return errors;
};
