import z from 'zod';
import { FiltersDto } from '@/shared/api/generated/model';
import { dataWordSchema, editWordSchema } from './zod-schemas/form.schema';

export type FormValues = z.infer<typeof dataWordSchema>;
export type FiltersKeys = keyof FiltersDto;

export type EditFormValues = z.infer<typeof editWordSchema>;
