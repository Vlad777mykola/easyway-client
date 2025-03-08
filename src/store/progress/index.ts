import { createSelectors } from '../createSelectors';
import { useProgressStoreBase } from './useProgressStore';

export type { RandomTest, ProgressStoreState, ExamModeProgressType } from './useProgressStore';

export const useProgressStore = createSelectors(useProgressStoreBase);
