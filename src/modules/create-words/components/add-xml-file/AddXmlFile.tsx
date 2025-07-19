import { type Dispatch, type SetStateAction, ChangeEvent } from 'react';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { checkIsCorrectFile, handleFileChange } from '../../utils/handleFileChange';
import { ALLOWED_TYPES, requiredKeys } from '../../constants/constants';
import type { CreateWordDto } from '@/shared/api/generated/model';
import { ErrorMessage } from '../error-message/ErrorMessage';
import { checkCorrectData } from '../../utils/checkCorrectData';

export const AddXmlFile = ({
	setTableWords,
}: {
	setTableWords: Dispatch<SetStateAction<CreateWordDto[]>>;
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

		requiredKeys.forEach((field) => {
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

			const errors = checkCorrectData(items, setTableWords);

			setErrorMap(errors.join('\n'));
		} catch (error) {
			if (error instanceof Error) {
				console.error('Invalid XML:', error.message);
			} else {
				console.error('Unknown error during JSON parsing');
			}
		}
	};

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
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
