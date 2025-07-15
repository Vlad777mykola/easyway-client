import React from 'react';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import { checkContainAllKeys } from '../../utils/checkContainAllKeys';
import { checkSameItems } from '../../utils/checkSameItems';
import { checkFileDublicates } from '../../utils/checkFileDublicates';
import { checkContainNumbers } from '../../utils/checkContainNumbers';
import { ALLOWED_TYPES, WORD_FIELDS } from '../../constants/constants';
import type { CreateWordDto } from '@/shared/api/generated/model';
import { ErrorMessage } from '../error-message/ErrorMessage';

export const AddXmlFile = ({
	setTableWords,
}: {
	setTableWords: React.Dispatch<React.SetStateAction<CreateWordDto[]>>;
}) => {
	const [error, setErrorMap] = useState<string>('');

	type CreateWordDtoType = (typeof ALLOWED_TYPES)[number];

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

			const fullKeysWord = checkContainAllKeys(items);
			if (fullKeysWord.errors.length > 0) setErrorMap(fullKeysWord.errors.join(', '));

			const uniqueItems = checkSameItems(fullKeysWord.correctWords);
			if (uniqueItems.errors !== '') setErrorMap(uniqueItems.errors);

			const hasNumbers = checkContainNumbers(uniqueItems.uniqueWords);
			if (hasNumbers.errors !== '') setErrorMap(hasNumbers.errors);

			const error = checkFileDublicates(hasNumbers.correctWords, setTableWords);

			if (error !== '') setErrorMap(error);

			const noErrors =
				error === '' &&
				uniqueItems.errors === '' &&
				fullKeysWord.errors.length === 0 &&
				hasNumbers.errors === '';

			if (noErrors) {
				setErrorMap('');
			}
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
			{error && <ErrorMessage error={error} />}
		</FieldGroup>
	);
};
