import React, { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { DataWords } from '../main/CreateWords';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { handleFileChange } from '../../utils/handleFileChange';
import { FormValues } from '../../types';
import { correctParse } from '../../utils/correctParse';
import { filterFileData } from '../../utils/filterFileData';

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
	errors,
	control,
	tableWords,
	setTableWords,
}: {
	errors: FieldErrors<FormValues>;
	control: Control<FormValues>;
	tableWords: DataWords[];
	setTableWords: React.Dispatch<React.SetStateAction<DataWords[]>>;
}) => {
	const [jsonInputError, setJsonInputError] = useState('');

	const parseJSON = (jsonString: string) => {
		try {
			const json = JSON.parse(jsonString);

			const dataWord: DataWords[] = json.map((word: JsonWord) => ({
				...word,
				key: word.name,
				variants: word.variants.join(', '),
			}));

			const filterJson = filterFileData(dataWord);

			const merged = [...tableWords, ...filterJson];

			const uniqueWords = Array.from(
				new Map([...tableWords, ...filterJson].map((word) => [word.name, word])).values(),
			);

			setJsonInputError(correctParse(merged, dataWord).join('.'));

			setTableWords(uniqueWords);
		} catch (e: unknown) {
			if (e instanceof Error) {
				console.error('Invalid JSON:', e.message);
			} else {
				console.error('Unknown error during JSON parsing');
			}
		}
	};

	return (
		<FieldGroup
			marginY="03"
			title="Send JSON file"
			error={errors?.jsonFile?.message || jsonInputError}
		>
			<Controller
				name="jsonFile"
				control={control}
				render={({ field }) => (
					<Input
						type="file"
						accept=".json"
						onChange={(e) => {
							handleFileChange(e, parseJSON);
							const file = e.target.files?.[0];
							field.onChange(file);
						}}
						size="middle"
						status={errors?.xmlFile && 'error'}
					/>
				)}
			/>
		</FieldGroup>
	);
};
