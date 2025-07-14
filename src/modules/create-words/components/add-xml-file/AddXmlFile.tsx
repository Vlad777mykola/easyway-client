import React from 'react';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import { ALLOWED_TYPES, WORD_FIELDS } from '../../constants/constants';
import type { CreateWordDto } from '@/shared/api/generated/model';

import styles from './addXmlFile.module.css';
import { containAllKeys } from '../../utils/containAllKeys';

//const WORD_FIELDS = ['name', 'transcription', 'translate', 'type', 'useCase', 'variants'] as const;

export const AddXmlFile = ({
	setTableWords,
}: {
	setTableWords: React.Dispatch<React.SetStateAction<CreateWordDto[]>>;
}) => {
	const [error, setErrorMap] = useState<string>('');

	type CreateWordDtoType = (typeof ALLOWED_TYPES)[number];

	const validateXMLContent = (xmlWords: CreateWordDto[]) => {
		const sameWords: string[] = [];
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
				setErrorMap(`That xml file already contains words: ${sameWords.join(', ')}`);
				return [...newWords, ...prev];
			} else {
				setErrorMap('');
			}

			return [...xmlWords, ...prev];
		});
	};

	// const containAllKeys = (xmlWords: CreateWordDto[]) => {
	// 	const emptyFieldsMap = new Map<string, string[]>();
	// 	const fullFields: CreateWordDto[] = [];

	// 	xmlWords.forEach((word) => {
	// 		const missingFields: string[] = [];

	// 		WORD_FIELDS.forEach((field) => {
	// 			if (!word[field] || word[field].length === 0) {
	// 				missingFields.push(field);
	// 			}
	// 		});

	// 		if (missingFields.length > 0) {
	// 			const name = word.name || '(no name)';
	// 			emptyFieldsMap.set(name, missingFields);
	// 		} else {
	// 			fullFields.push(word);
	// 		}
	// 	});

	// 	if (emptyFieldsMap.size > 0) {
	// 		const errors = Array.from(emptyFieldsMap.entries()).map(([name, fields]) => {
	// 			return `Empty key in ${name}: ${fields.join(', ')}.`;
	// 		});
	// 		setErrorMap(errors.join('\n'));
	// 	} else {
	// 		setErrorMap('');
	// 	}

	// 	return fullFields;
	// };

	const checkSameItems = (fileItems: CreateWordDto[]) => {
		const uniqueItems: CreateWordDto[] = [];
		const sameItems: string[] = [];

		fileItems.forEach((item) => {
			if (!uniqueItems.some((unique) => unique.name === item.name)) {
				uniqueItems.push(item);
			} else {
				sameItems.push(item.name);
			}
		});

		if (sameItems.length > 0) {
			setErrorMap(`File has same word(s): ${sameItems.join(', ')}`);
		} else {
			setErrorMap('');
		}

		return uniqueItems;
	};

	const parseWordType = (value: string | null): CreateWordDtoType => {
		if (ALLOWED_TYPES.includes(value as CreateWordDtoType)) {
			return value as CreateWordDtoType;
		}
		return 'other';
	};

	const createCorrectedWord = (xmlWord: Element): CreateWordDto => {
		const word: Partial<CreateWordDto> = {};

		WORD_FIELDS.forEach((field) => {
			const safeKey = field as Exclude<keyof CreateWordDto, 'type' | 'variants'>;

			if (field === 'type') {
				word[field] = parseWordType(xmlWord.getElementsByTagName(field)[0]?.textContent);
			}

			if (field === 'variants') {
				const variantsParent = xmlWord?.getElementsByTagName(field)[0];
				word[field] =
					typeof variantsParent !== 'undefined'
						? Array.from(variantsParent.getElementsByTagName('variant'))
								.map((v) => v.textContent)
								.join(', ')
						: '';
			}

			if (field !== 'variants' && field !== 'type') {
				word[safeKey] = xmlWord.getElementsByTagName(field)[0]?.textContent || '';
			}
		});

		return word as CreateWordDto;
	};

	const parseXML = (xmlString: string) => {
		try {
			const parser = new DOMParser();
			const xml = parser.parseFromString(xmlString, 'application/xml');

			const items: CreateWordDto[] = Array.from(xml.getElementsByTagName('word')).map((item) => {
				return createCorrectedWord(item);
			});

			const fullKeysWord = containAllKeys(items);

			if (fullKeysWord.errors.length > 0) {
				setErrorMap(fullKeysWord.errors.join(', '));
			}

			const uniqueItems = checkSameItems(fullKeysWord.correctWords);
			validateXMLContent(uniqueItems);
		} catch (error) {
			if (error instanceof Error) {
				console.error('Invalid XML:', error.message);
			} else {
				console.error('Unknown error during JSON parsing');
			}
		}
	};

	const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
		const error = checkIsCorrectFile(event);
		if (error) {
			setErrorMap(error);
			return;
		} else {
			setErrorMap('');
		}
		handleFileChange(event, parseXML);
	};

	return (
		<FieldGroup marginY="03" title="Send XML file">
			<Input
				type="file"
				accept=".xml"
				size="middle"
				status={error && 'error'}
				onChange={(e) => onChangeInput(e)}
			/>
			{error && <span className={styles.errorMessage}>{error}</span>}
		</FieldGroup>
	);
};
