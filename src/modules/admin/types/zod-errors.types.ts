import { z } from 'zod';
import { formFiltersDataSchema } from '../zod-schemas/form-filters.schema';

type ZodFieldError = { _errors: string[] };

export type FormattedErrorsFilters = {
	tenses?: ZodFieldError;
	topic?: ZodFieldError;
	categories?: ZodFieldError;
	submit?: ZodFieldError;
};

export type FormDataFilters = z.infer<typeof formFiltersDataSchema>;
