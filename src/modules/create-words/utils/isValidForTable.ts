import { CreateWordDto } from '@/shared/api/generated/model';

export const isValidWordForTable = (name: string, wordList: CreateWordDto[]) =>
	wordList.find((w) => w.name === name);
