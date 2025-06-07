import { FormInputs, FormItems } from '@/modules/admin/types/form-filters.types';

export const initialFormInputs: FormInputs = {
	tenses: '',
	topic: '',
	categories: '',
};

export const initialFormItems: FormItems = {
	tenses: [],
	topic: [],
	categories: [],
};

export const initialExistTags: FormItems = {
	tenses: ['Present', 'Past', 'Future'],
	topic: ['Present', 'Past', 'Future'],
	categories: ['Present', 'Past', 'Future'],
};

export const KEYS = ['tenses', 'topic', 'categories'] as const;
