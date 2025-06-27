import { z } from 'zod';

const xmlFileSchema = z
	.instanceof(File)
	.refine((file) => file.type === 'text/xml' || file.name.toLowerCase().endsWith('.xml'), {
		message: 'File must be an XML file.',
	})
	.refine((file) => file.size > 0, {
		message: 'File cannot be empty.',
	});

const jsonFileSchema = z
	.instanceof(File)
	.refine((file) => file.type === 'text/json' || file.name.toLowerCase().endsWith('.json'), {
		message: 'File must be an JSON file.',
	})
	.refine((file) => file.size > 0, {
		message: 'File cannot be empty.',
	});

const fileDataSchema = z.object({
	name: z.string().min(3, 'Name is required'),
	transcription: z.string().min(3, 'Transcription is required'),
	translate: z.string().min(3, 'Translate is required'),
	description: z.string().min(3, 'Use case is required'),
	type: z.string().min(1, 'Select at least one type'),
	variants: z.string().min(1, 'Select at least one type'),
});

export const dataWordsArraySchema = z.array(fileDataSchema).refine(
	(arr) => {
		const names = arr.map((item) => item.name);
		return new Set(names).size === names.length;
	},
	{
		message: 'Each item must have a unique name',
	},
);

const filledWordSchema = z
	.record(z.any())
	.refine((obj) => Object.values(obj).every((v) => v !== undefined && v !== null && v !== ''), {
		message: 'All fields in the object must be filled',
	});

export const arrayOfFilledWordsSchema = z.array(filledWordSchema);

const hasRequiredKeysJson = z
	.record(z.any())
	.refine(
		(obj) =>
			['name', 'transcription', 'translate', 'useCase', 'type', 'variants'].every(
				(key) => key in obj,
			),
		{
			message: 'Missing required keys',
		},
	);

const hasRequiredKeysXml = z
	.record(z.any())
	.refine(
		(obj) =>
			['name', 'transcription', 'translate', 'description', 'type', 'variants'].every(
				(key) => key in obj,
			),
		{
			message: 'Missing required keys',
		},
	);

export const arrayOfHasRequiredKeysJson = z.array(hasRequiredKeysJson);
export const arrayOfHasRequiredKeysXml = z.array(hasRequiredKeysXml);

export const dataWordSchema = z.object({
	name: z.string().min(3, 'Name is required'),
	transcription: z.string().min(3, 'Transcription is required'),
	translate: z.string().min(3, 'Translate is required'),
	useCase: z.string().min(3, 'Use case is required'),
	type: z.string().min(1, 'Select at least one type'),
	variants: z.array(z.string()).min(1, 'Variants must have at least one variant'),
	xmlFile: z.union([
		xmlFileSchema.optional(),
		dataWordsArraySchema,
		arrayOfFilledWordsSchema,
		arrayOfHasRequiredKeysJson,
	]),
	jsonFile: z.union([
		jsonFileSchema.optional(),
		dataWordsArraySchema,
		arrayOfFilledWordsSchema,
		arrayOfHasRequiredKeysXml,
	]),
});
