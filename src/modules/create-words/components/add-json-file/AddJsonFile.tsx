import React, { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import { FormValues } from '../../types';
import { correctParse } from '../../utils/correctParse';
import { filterFileData } from '../../utils/filterFileData';
import { CreateWordDto } from '@/shared/api/generated/model';
import styles from './addJsonFile.module.css';

export type JsonWord = {
	key: React.Key;
	name: string;
	transcription: string;
	translate: string;
	type: string;
	useCase: string;
	variants: string[];
};

export const AddJsonFile = ({
	setTableWords,
}: {
	setTableWords: React.Dispatch<React.SetStateAction<CreateWordDto[]>>;
}) => {
	const [error, setErrorMap] = useState<string>('');

	const parseJSON = (jsonString: string) => {
		try {
			const json = JSON.parse(jsonString);

			const dataWord: CreateWordDto[] = json.map((word: JsonWord) => ({
				...word,
				key: word.name,
				variants: word.variants.join(', '),
			}));

			console.log('DATA WORD: ', dataWord);

			//const filterJson = filterFileData(dataWord);

			//const merged = [...tableWords, ...filterJson];

			// const uniqueWords = Array.from(
			// 	new Map([...tableWords, ...filterJson].map((word) => [word.name, word])).values(),
			// );

			//setJsonInputError(correctParse(merged, dataWord).join('.'));

			//setTableWords(uniqueWords);
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error('Invalid JSON:', e.message);
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
		handleFileChange(event, parseJSON);
	};

	return (
		<FieldGroup marginY="03" title="Send JSON file">
			<Input
				type="file"
				accept=".json"
				size="middle"
				status={error && 'error'}
				onChange={(e) => onChangeInput(e)}
			/>
			{error && <span className={styles.errorMessage}>{error}</span>}
		</FieldGroup>
	);
};
