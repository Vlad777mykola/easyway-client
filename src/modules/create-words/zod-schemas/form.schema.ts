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

const hasRequiredKeys = z.record(z.any()).superRefine((obj, ctx) => {
	const keys = ['name', 'transcription', 'translate', 'useCase', 'type', 'variants'];

	for (let i = 0; i < keys.length; i++) {
		if (!obj[keys[i]]) {
			ctx.addIssue({
				path: [keys[i]],
				code: z.ZodIssueCode.custom,
				message: `Key "${keys[i]}" in ${obj.name} object must be filled.`,
			});
		}

		const wordArr =
			typeof obj[keys[i]] === 'string'
				? obj[keys[i]].replace(/\s+/g, '').split('')
				: obj[keys[i]]?.join('').split('');

		if (!wordArr?.every((symbol: string) => isNaN(Number(symbol)))) {
			ctx.addIssue({
				path: [keys[i]],
				code: z.ZodIssueCode.custom,
				message: `Key "${keys[i]}" in ${obj.name} cannot contain numbers.`,
			});
		}
	}
});

export const arrayOfHasRequiredKeys = z.array(hasRequiredKeys);

export const dataWordSchema = z.object({
	name: z
		.string()
		.min(3, 'Name is required')
		.refine(
			(val) => {
				const stringArr = val.replace(/\s+/g, '').split('');
				return stringArr.every((symbol) => isNaN(Number(symbol)));
			},
			{
				message: 'Cannot contain numbers.',
			},
		),
	transcription: z
		.string()
		.min(3, 'Transcription is required')
		.refine(
			(val) => {
				const stringArr = val.replace(/\s+/g, '').split('');
				return stringArr.every((symbol) => isNaN(Number(symbol)));
			},
			{
				message: 'Cannot contain numbers.',
			},
		),
	translate: z
		.string()
		.min(3, 'Translate is required')
		.refine(
			(val) => {
				const stringArr = val.replace(/\s+/g, '').split('');
				return stringArr.every((symbol) => isNaN(Number(symbol)));
			},
			{
				message: 'Cannot contain numbers.',
			},
		),
	useCase: z
		.string()
		.min(3, 'Use case is required')
		.refine(
			(val) => {
				const stringArr = val.replace(/\s+/g, '').split('');
				return stringArr.every((symbol) => isNaN(Number(symbol)));
			},
			{
				message: 'Cannot contain numbers.',
			},
		),
	type: z.enum(['noun', 'adjective', 'verb', 'adverb', 'other']),
	variants: z
		.string()
		.min(1, 'Variants must have at least one variant')
		.refine((str) => str, {
			message: 'Variants cannot contain numbers',
		}),
	imgUrl: z.string().optional(),
	// xmlFile: z.union([xmlFileSchema.optional(), dataWordsArraySchema, hasRequiredKeys]),
	// jsonFile: z.union([jsonFileSchema.optional(), dataWordsArraySchema, hasRequiredKeys]),
});
