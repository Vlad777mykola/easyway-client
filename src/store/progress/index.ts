import { createSelectors } from '../createSelectors';
import { useProgressStoreBase } from './useProgressStore';

export type { RandomTest } from './useProgressStore';

export const useProgressStore = createSelectors(useProgressStoreBase);
