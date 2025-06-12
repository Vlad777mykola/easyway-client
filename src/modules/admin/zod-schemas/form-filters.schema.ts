import { z } from 'zod';
import { FiltersValue } from '../types';

export const createFormDataSchema = (filters: FiltersValue[]) =>
	z
		.string()
		.min(3, 'Input is required')
		.max(20, 'Too long')
		.regex(/^[A-Za-z]+$/, 'Only letters are allowed (no numbers or symbols)')
		.transform((val) => val.trim())
		.refine((val) => !filters.some((f) => f.value.toLowerCase() === val.toLowerCase()), {
			message: 'This value already exists',
		});
