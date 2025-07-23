import React, { useState, Dispatch, type SetStateAction } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import { CreateWordDto } from '@/shared/api/generated/model';
import { ErrorMessage } from '../../../../ui-components/error-message/ErrorMessage';
import { checkCorrectData } from '../../utils/checkCorrectData';

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
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>;
}) => {
	const [error, setErrorMap] = useState<string>('');

	const parseJSON = (jsonString: string) => {
		try {
			const json = JSON.parse(jsonString);

			const dataWord: CreateWordDto[] = json.map((word: JsonWord) => ({
				...word,
				key: word.name,
				variants: word.variants ? word.variants.join(', ') : '',
			}));

			const errors = checkCorrectData(dataWord, setTableWords);

			setErrorMap(errors.join('\n'));
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
			{error && <ErrorMessage error={error} />}
		</FieldGroup>
	);
};
