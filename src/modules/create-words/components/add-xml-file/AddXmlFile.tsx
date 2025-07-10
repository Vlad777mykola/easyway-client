import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
// import { correctParse } from '../../utils/correctParse';
// import { filterFileData } from '../../utils/filterFileData';
import { FormValues } from '../../types';
import type { CreateWordDto } from '@/shared/api/generated/model';
import { ALLOWED_TYPES } from '../../constants/constants';

import styles from './addXmlFile.module.css';

const WORD_FIELDS = [
	'name',
	'transcription',
	'translate',
	'type',
	'useCase',
	'variants',
	'imgUrl',
] as const;

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
		WORD_FIELDS.forEach((field) => {
			const wordWithEmptyFields: CreateWordDto[] = xmlWords.filter(
				(word) => word[field] === undefined || word[field] === '',
			);

			console.log('WORD WITH EMPTY FIELDS: ', wordWithEmptyFields);

			setErrorMap(`XML file is missing required field: ${wordWithEmptyFields.join(', ')}`);
		});
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
				const variantsParent = xmlWord.getElementsByTagName(field)[0];
				word[field] = Array.from(variantsParent.getElementsByTagName('variant'))
					.map((v) => v.textContent)
					.join(', ');
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

			//containAllKeys(items);
			validateXMLContent(items);

			//const filterXML = filterFileData(items);

			//const newWords = [...tableWords, ...items];

			// const uniqueWords = Array.from(
			// 	new Map([...tableWords, ...filterXML].map((word) => [word.name, word])).values(),
			// );

			//setXmlInputError(correctParse(merged, items).join('.'));

			//setTableWords((prev: CreateWordDto[]) => [...prev, ...items]);
		} catch (error) {
			if (error instanceof Error) {
				console.error('Invalid JSON:', error.message);
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
		// <FieldGroup
		// 	marginY="03"
		// 	title="Send XML file"
		// 	//error={errors?.xmlFile?.message || xmlInputError}
		// >
		// 	<Controller
		// 		name="xmlFile"
		// 		//control={control}
		// 		render={({ field }) => (
		// 			<Input
		// 			//type="file"
		// 			//accept=".xml"
		// 			// onChange={(e) => {
		// 			// 	handleFileChange(e, parseXML);
		// 			// 	const file = e.target.files?.[0];
		// 			// 	field.onChange(file);
		// 			// }}
		// 			//size="middle"
		// 			//status={errors?.xmlFile && 'error'}
		// 			/>
		// 		)}
		// 	/>
		// </FieldGroup>
		<FieldGroup marginY="03" title="Send XML file">
			<Input type="file" accept=".xml" size="middle" onChange={(e) => onChangeInput(e)} />
			{error && <span className={styles.errorMessage}>{error}</span>}
		</FieldGroup>
	);
};
