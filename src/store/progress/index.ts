import { createSelectors } from '../createSelectors';
import { useProgressStoreBase } from './useProgressStore';

export const useProgressStore = createSelectors(useProgressStoreBase);
