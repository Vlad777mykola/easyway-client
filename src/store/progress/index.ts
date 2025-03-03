import { createSelectors } from '../createSelectors';
import { useProgressStoreBase } from './useProgressStore';

export type { RandomWord } from './useProgressStore';

export const useProgressStore = createSelectors(useProgressStoreBase);
