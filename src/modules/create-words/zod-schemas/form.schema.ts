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

export const dataWordsArraySchema = z.array(z.any()).refine(
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

const hasRequiredKeys = z
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

export const arrayOfHasRequiredKeys = z.array(hasRequiredKeys);

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
		hasRequiredKeys,
	]),
	jsonFile: z.union([
		jsonFileSchema.optional(),
		dataWordsArraySchema,
		arrayOfFilledWordsSchema,
		hasRequiredKeys,
	]),
});
