import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { DataWords } from '../main/CreateWords';
import { arrayOfHasRequiredKeys, dataWordsArraySchema } from '../../zod-schemas/form.schema';
import { handleFileChange } from '../../utils/handleFileChange';
import { FormValues } from '../../types';
import { checkCorrectFormat } from '../../utils/checkCorrectFormat';
import { requiredKeys } from '../../constants/constants';

export const AddXmlFile = ({
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
	const [xmlInputError, setXmlInputError] = useState('');

	const parseXML = (xmlString: string) => {
		const parser = new DOMParser();
		const xml = parser.parseFromString(xmlString, 'application/xml');

		const items: DataWords[] = Array.from(xml.getElementsByTagName('word')).map((item) => {
			const variantsParent = item.getElementsByTagName('variants')[0];
			const variants = variantsParent
				? Array.from(variantsParent.getElementsByTagName('variant'))
						.map((v) => v.textContent)
						.join(', ')
				: '';

			return {
				key: item.getElementsByTagName('name')[0]?.textContent || '',
				name: item.getElementsByTagName('name')[0]?.textContent || '',
				transcription: item.getElementsByTagName('transcription')[0]?.textContent || '',
				translate: item.getElementsByTagName('translate')[0]?.textContent || '',
				type: item.getElementsByTagName('type')[0]?.textContent || '',
				useCase: item.getElementsByTagName('useCase')[0]?.textContent || '',
				variants,
			};
		});

		const filterXML = items.filter((word) =>
			requiredKeys.every(
				(key) => word[key] !== undefined && word[key] !== null && word[key] !== '',
			),
		);

		const parsedAllKeys = arrayOfHasRequiredKeys.safeParse(items);

		if (!parsedAllKeys.success) {
			setXmlInputError((prev) => `${prev} ${checkCorrectFormat(parsedAllKeys)}`);
		}

		const merged = [...tableWords, ...items];
		const parseCondition = dataWordsArraySchema.safeParse(merged);

		const successParse = parsedAllKeys.success && parseCondition.success;

		if (!parseCondition.success) {
			setXmlInputError(parseCondition.error.errors[0].message);
		}

		if (successParse) {
			setXmlInputError('');
		}

		const uniqueWords = Array.from(
			new Map([...tableWords, ...filterXML].map((word) => [word.name, word])).values(),
		);

		setTableWords(uniqueWords);
	};

	return (
		<FieldGroup
			marginY="03"
			title="Send XML file"
			error={errors?.xmlFile?.message || xmlInputError}
		>
			<Controller
				name="xmlFile"
				control={control}
				render={({ field }) => (
					<Input
						type="file"
						accept=".xml"
						onChange={(e) => {
							handleFileChange(e, parseXML);
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
