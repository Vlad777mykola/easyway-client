import React from 'react';
import { CreateWordDto } from '@/shared/api/generated/model';

export const validateFileContent = (
	xmlWords: CreateWordDto[],
	setTableWords: React.Dispatch<React.SetStateAction<CreateWordDto[]>>,
) => {
	const sameWords: string[] = [];
	let error = '';
	setTableWords((prev) => {
		const existWord = prev.filter((word) =>
			xmlWords.some(
				(xmlWord) => xmlWord.name.trim().toLowerCase() === word.name.trim().toLowerCase(),
			),
		);

		if (existWord.length > 0) {
			sameWords.push(...existWord.map((word) => word.name));
			const newWords = prev.filter(
				(word) =>
					!xmlWords.some(
						(xmlWord) => xmlWord.name.trim().toLowerCase() !== word.name.trim().toLowerCase(),
					),
			);
			error = `That xml file already contains words: ${sameWords.join(', ')}`;
			return [...newWords, ...prev];
		}

		return [...xmlWords, ...prev];
	});

	console.log('ERROR FILE CONTENT: ', error);
	console.log('SAME WORDS: ', sameWords);

	return error;
};
