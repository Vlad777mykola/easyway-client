import { z } from 'zod';

export const schema = z.object({
	collectionName: z.string().min(3, 'Collection is required'),
	words: z.string().min(3, 'Collection must have at least one word'),
});
