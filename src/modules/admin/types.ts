import { FiltersDto } from '@/shared/api/generated/model';

export type FiltersKeys = keyof FiltersDto;
export type FiltersValue = { action: string; value: string };
export type ActionType = 'created' | 'deleted' | 'existing';
export type FiltersMap = Map<FiltersKeys, FiltersValue[]>;
