export const STEP = {
	PREV: 'prev',
	NEXT: 'next',
};

export type StepType = (typeof STEP)[keyof typeof STEP];

export const DOTS = '...';

export const SIBLING_COUNT = 2;
export const PAGE_SIZE = 1;
