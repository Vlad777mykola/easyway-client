import { FiltersRes } from '@/shared/api-hooks/useFilters';

export type FiltersKeys = keyof FiltersRes;
export type FiltersValue = { action: string; value: string };
export type ActionType = 'created' | 'deleted' | 'existing';
export type FiltersMap = Map<FiltersKeys, FiltersValue[]>;
