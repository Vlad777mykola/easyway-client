import { createSelectors } from '../createSelectors';
import { useProgressStoreBase } from './useProgressStore';

export type {
	RandomTest,
	ResolvedRandomTest,
	ProgressStoreState,
	ExamModeProgressType,
	TakenTestCount,
} from './useProgressStore';

export const useProgressStore = createSelectors(useProgressStoreBase);
