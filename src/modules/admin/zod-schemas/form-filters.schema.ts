import { z } from 'zod';

const uniqueArray = z.array(z.string()).refine((arr) => new Set(arr).size === arr.length, {
	message: 'Items must be unique.',
});

export const formFiltersDataSchema = z
	.object({
		tenses: uniqueArray,
		topic: uniqueArray,
		categories: uniqueArray,
	})
	.refine((data) => data.tenses.length > 0 || data.topic.length > 0 || data.categories.length > 0, {
		message: 'At least one filter must have at least one item.',
		path: ['submit'],
	});

export const createInputSchema = (existingItems: string[]) =>
	z
		.string()
		.min(1, 'Input is required')
		.refine((val) => !existingItems.includes(val), {
			message: 'This item is already in the list.',
		});
