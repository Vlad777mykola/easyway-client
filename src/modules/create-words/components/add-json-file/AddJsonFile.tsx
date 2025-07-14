import React, { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import { CreateWordDto } from '@/shared/api/generated/model';
import styles from './addJsonFile.module.css';
import { checkContainAllKeys } from '../../utils/checkContainAllKeys';
import { checkSameItems } from '../../utils/checkSameItems';
import { validateFileContent } from '../../utils/validateFileContent';

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

			const fullKeysWord = checkContainAllKeys(dataWord);

			if (fullKeysWord.errors.length > 0) setErrorMap(fullKeysWord.errors.join(', '));

			const uniqueItems = checkSameItems(fullKeysWord.correctWords);

			if (uniqueItems.errors !== '') setErrorMap(uniqueItems.errors);

			const error = validateFileContent(uniqueItems.uniqueWords, setTableWords);

			if (error !== '') setErrorMap(error);
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
