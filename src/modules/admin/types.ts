import { FiltersKeys } from '@/shared/api-hooks/useFilters';

export type FiltersValue = { action: string; value: string };
export type ActionType = 'created' | 'deleted' | 'existing';
export type FiltersMap = Map<FiltersKeys, FiltersValue[]>;
