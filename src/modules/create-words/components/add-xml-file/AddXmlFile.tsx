import React from 'react';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import type { CreateWordDto } from '@/shared/api/generated/model';
import { ALLOWED_TYPES } from '../../constants/constants';

import styles from './addXmlFile.module.css';

const WORD_FIELDS = ['name', 'transcription', 'translate', 'type', 'useCase', 'variants'] as const;

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
				setErrorMap('That xml file already contains words: ' + sameWords.join(', '));
				return [...newWords, ...prev];
			}

			return [...xmlWords, ...prev];
		});
	};

	const containAllKeys = (xmlWords: CreateWordDto[]) => {
		let emptyFields: { name: string; fields: string[] }[] = [];
		let fullFields: CreateWordDto[] = [];
		let error = '';
		xmlWords.forEach((word: CreateWordDto) => {
			WORD_FIELDS.forEach((field) => {
				const value = word[field];
				if (!value || value.length === 0) {
					if (!emptyFields.some((field) => field.name === word.name)) {
						emptyFields.push({ name: word.name, fields: [field] });
					} else {
						const found: { name: string; fields: string[] } = emptyFields.find(
							(field) => field.name === word.name,
						);
						const filtered = emptyFields.filter((field) => field.name !== word.name);
						emptyFields = [...filtered, { ...found, fields: [...found.fields, field] }];
					}
				}
			});

			if (!emptyFields.some((field) => field.name === word.name)) {
				fullFields.push(word);
			}
		});

		if (emptyFields.length > 0) {
			emptyFields.forEach((field) => {
				error =
					field.name.length === 0
						? 'Check that all objects have name of word.'
						: `Empty key in ${field.name}: ${field.fields.join(', ')}`;
				setErrorMap(error);
			});
		}

		return fullFields;
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
				console.log('VARIANTS PARENT: ', variantsParent);
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
			validateXMLContent(fullKeysWord);
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
		}
		handleFileChange(event, parseXML);
	};

	return (
		<FieldGroup marginY="03" title="Send XML file">
			<Input type="file" accept=".xml" size="middle" onChange={(e) => onChangeInput(e)} />
			{error && <span className={styles.errorMessage}>{error}</span>}
		</FieldGroup>
	);
};
