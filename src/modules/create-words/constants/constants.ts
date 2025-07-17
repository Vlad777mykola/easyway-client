import { CreateWordDto } from '@/shared/api/generated/model';

export const requiredKeys: (keyof CreateWordDto)[] = [
	'name',
	'transcription',
	'translate',
	'useCase',
	'type',
	'variants',
];

export const ALLOWED_TYPES = ['noun', 'adjective', 'verb', 'adverb', 'other'] as const;
