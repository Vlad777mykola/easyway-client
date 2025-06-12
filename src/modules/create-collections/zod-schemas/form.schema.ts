import { z } from 'zod';

export const schema = z.object({
	title: z.string().min(3, 'Title is required'),
	description: z.string().min(3, 'Description is required'),
	topic: z.array(z.string()).min(1, 'Select at least one topic'),
	level: z.array(z.string()).min(1, 'Select at least one level'),
	tenses: z.array(z.string()).min(1, 'Select at least one tenses'),
	category: z.array(z.string()).min(1, 'Select at least one category'),
});
