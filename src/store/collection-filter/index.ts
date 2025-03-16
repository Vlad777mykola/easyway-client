import { createSelectors } from '../createSelectors';
import { useCollectionFilterBase } from './useCollectionFilterBase';

export type { CollectionFilterStoreType } from './useCollectionFilterBase';
export const useCollectionFilter = createSelectors(useCollectionFilterBase);
