import React, { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { DataWords } from '../main/CreateWords';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { handleFileChange } from '../../utils/handleFileChange';
import { FormValues } from '../../types';
import { arrayOfHasRequiredKeys, dataWordsArraySchema } from '../../zod-schemas/form.schema';
import { checkCorrectFormat } from '../../utils/checkCorrectFormat';
import { requiredKeys } from '../../constants/constants';

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
		const parsedAllKeys = arrayOfHasRequiredKeys.safeParse(json);

		if (!parsedAllKeys.success) {
			setJsonInputError((prev) => `${prev} ${checkCorrectFormat(parsedAllKeys)}`);
		}

		const filterJson: JsonWord[] = json.filter((word: JsonWord) =>
			requiredKeys.every(
				(key) => word[key] !== undefined && word[key] !== null && word[key] !== '',
			),
		);

		const result: DataWords[] = filterJson.map((word: JsonWord) => ({
			...word,
			key: word.name,
			variants: word.variants.join(', '),
		}));

		const merged = [...tableWords, ...result];
		const parseCondition = dataWordsArraySchema.safeParse(merged);

		const successParse = parsedAllKeys.success && parseCondition.success;

		if (!parseCondition.success) {
			setJsonInputError((prev) => `${prev} ${parseCondition.error.errors[0].message}`);
		}

		if (successParse) {
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
