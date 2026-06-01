import { z } from 'zod';

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
});
