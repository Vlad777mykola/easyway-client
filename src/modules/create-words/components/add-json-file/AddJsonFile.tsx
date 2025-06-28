import React, { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { DataWords } from '../main/CreateWords';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { handleFileChange } from '../../utils/handleFileChange';
import { FormValues } from '../../types';
import {
	arrayOfFilledWordsSchema,
	arrayOfHasRequiredKeys,
	dataWordsArraySchema,
} from '../../zod-schemas/form.schema';

type JsonWord = {
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
		const json = JSON.parse(jsonString);
		const parseFilledSchema = arrayOfFilledWordsSchema.safeParse(json);
		const parsedAllKeys = arrayOfHasRequiredKeys.safeParse(json);

		if (!parseFilledSchema.success) {
			setJsonInputError(parseFilledSchema.error.errors[0].message);
			return;
		} else {
			setJsonInputError('');
		}

		if (!parsedAllKeys.success) {
			setJsonInputError(parsedAllKeys.error.errors[0].message);
			return;
		} else {
			setJsonInputError('');
		}

		const result: DataWords[] = json.map((word: JsonWord) => ({
			...word,
			key: word.name,
			variants: word.variants.join(', '),
		}));

		const merged = [...tableWords, ...result];
		const parseCondition = dataWordsArraySchema.safeParse(merged);

		if (!parseCondition.success) {
			setJsonInputError(parseCondition.error.errors[0].message);
		} else {
			setJsonInputError('');
		}

		const uniqueWords = Array.from(
			new Map([...tableWords, ...result].map((word) => [word.name, word])).values(),
		);

		setTableWords(uniqueWords);
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
