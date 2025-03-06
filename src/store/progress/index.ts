import { createSelectors } from '../createSelectors';
import { useProgressStoreBase } from './useProgressStore';

export type { RandomTest, ProgressStoreState } from './useProgressStore';

export const useProgressStore = createSelectors(useProgressStoreBase);
