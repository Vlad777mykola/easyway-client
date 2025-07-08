import React from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useState } from 'react';
import { FieldGroup } from '@/ui-components/FieldGroup';
import { Input } from '@/ui-components/Input';
import { handleFileChange } from '../../utils/handleFileChange';
// import { correctParse } from '../../utils/correctParse';
// import { filterFileData } from '../../utils/filterFileData';
import { FormValues } from '../../types';
import { CreateWordDto } from '@/shared/api/generated/model';

export const AddXmlFile = ({
	errors,
	control,
	tableWords,
	setTableWords,
}: {
	errors: FieldErrors<FormValues>;
	control: Control<FormValues>;
	tableWords: CreateWordDto[];
	setTableWords: React.Dispatch<React.SetStateAction<CreateWordDto[]>>;
}) => {
	const [xmlInputError, setXmlInputError] = useState('');

	const parseXML = (xmlString: string) => {
		console.error(
			xmlString,
			tableWords,
			setTableWords,
			setXmlInputError,
			'Unknown error during JSON parsing',
		);
		// try {
		// 	const parser = new DOMParser();
		// 	const xml = parser.parseFromString(xmlString, 'application/xml');

		// 	const items: CreateWordDto[] = Array.from(xml.getElementsByTagName('word')).map((item) => {
		// 		const variantsParent = item.getElementsByTagName('variants')[0];
		// 		const variants = variantsParent
		// 			? Array.from(variantsParent.getElementsByTagName('variant'))
		// 					.map((v) => v.textContent)
		// 					.join(', ')
		// 			: '';

		// 		return {
		// 			key: item.getElementsByTagName('name')[0]?.textContent || '',
		// 			name: item.getElementsByTagName('name')[0]?.textContent || '',
		// 			transcription: item.getElementsByTagName('transcription')[0]?.textContent || '',
		// 			translate: item.getElementsByTagName('translate')[0]?.textContent || '',
		// 			type: item.getElementsByTagName('type')[0]?.textContent || '',
		// 			useCase: item.getElementsByTagName('useCase')[0]?.textContent || '',
		// 			variants,
		// 		};
		// 	});

		// 	const filterXML = filterFileData(items);

		// 	const merged = [...tableWords, ...items];

		// 	const uniqueWords = Array.from(
		// 		new Map([...tableWords, ...filterXML].map((word) => [word.name, word])).values(),
		// 	);

		// 	setXmlInputError(correctParse(merged, items).join('.'));

		// 	setTableWords(uniqueWords);
		// } catch (error) {
		// 	if (error instanceof Error) {
		// 		console.error('Invalid JSON:', error.message);
		// 	} else {
		// 		console.error('Unknown error during JSON parsing');
		// 	}
		// }
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
