import { createSelectors } from '../createSelectors';
import { useCommonStoreBase } from './useCommonStore';

export const useCommonStore = createSelectors(useCommonStoreBase);
