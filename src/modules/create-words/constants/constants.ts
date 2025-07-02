import { DataWords } from '../components/main/CreateWords';

export const requiredKeys: (keyof DataWords)[] = [
	'name',
	'transcription',
	'translate',
	'useCase',
	'type',
	'variants',
];
