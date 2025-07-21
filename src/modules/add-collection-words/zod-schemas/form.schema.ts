import { z } from 'zod';

export const schema = z.object({
	collectionName: z.string().min(3, 'Collection is required'),
	words: z
		.string()
		.min(3, 'Collection must have at least one word')
		.refine(
			(val) => {
				const stringArr = val.replace(/\s+/g, '').split('');
				return stringArr.every((symbol) => isNaN(Number(symbol)));
			},
			{
				message: 'Cannot contain numbers.',
			},
		)
		.refine(
			(val) => {
				const stringArr = val.split(' ');
				return stringArr.every((symbol, index) => {
					if (index !== stringArr.length - 1) {
						return symbol.includes(',');
					}
					return true;
				});
			},
			{
				message: 'Every word must be divided by coma.',
			},
		)
		.refine(
			(val) => {
				const stringArr = val.split(/[,\s]+/).map((item) => item.trim());
				return new Set(stringArr).size === stringArr.length;
			},
			{
				message: 'Every word must be unique.',
			},
		),
});
