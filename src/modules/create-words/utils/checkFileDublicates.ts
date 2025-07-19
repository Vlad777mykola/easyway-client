import { Dispatch, type SetStateAction } from 'react';
import { CreateWordDto } from '@/shared/api/generated/model';

export const checkFileDublicates = (
	fileWords: CreateWordDto[],
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>,
) => {
	let sameWords: string[] = [];

	setTableWords((prev) => {
		const existingNames = prev.map((w) => w.name.trim().toLowerCase());

		const filteredXml = fileWords.filter((fileWord) => {
			const name = fileWord.name.trim().toLowerCase();
			const isDuplicate = existingNames.includes(name);
			if (isDuplicate) sameWords.push(fileWord.name);
			return !isDuplicate;
		});

		return [...filteredXml, ...prev];
	});

	if (sameWords.length > 0) {
		return `File contain that words: ${sameWords.join(', ')}`;
	}

	return '';
};
