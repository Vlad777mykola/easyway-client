import { CreateWordDto } from '@/shared/api/generated/model';

export const requiredKeys: (keyof CreateWordDto)[] = [
	'name',
	'transcription',
	'translate',
	'useCase',
	'type',
	'variants',
];
