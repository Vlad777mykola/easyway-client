import z from 'zod';
import { schema } from './zod-schemas/form.schema';
import { FiltersDto } from '@/shared/api/generated/model';

export type FormValues = z.infer<typeof schema>;
export type FiltersKeys = keyof FiltersDto;
