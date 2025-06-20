import z from 'zod';
import { FiltersDto } from '@/shared/api/generated/model';
import { schema } from './zod-schemas/form.schema';

export type FormValues = z.infer<typeof schema>;
export type FiltersKeys = keyof FiltersDto;
