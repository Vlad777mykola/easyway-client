import z from 'zod';
import { schema } from './zod-schemas/form.schema';

export type FormValues = z.infer<typeof schema>;
