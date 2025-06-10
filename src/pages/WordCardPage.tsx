import { useWords } from '@/shared/api-hooks/useWords';
import { useParams } from 'react-router-dom';
import type { WordsType } from '@/modules/words/components/main/Main';
import { WordInfo } from '@/modules/word-info/WordInfo';

const WordCardPage = () => {
	const { wordId, wordName } = useParams();
	const { data: words } = useWords(wordName || '');
	const word = words?.find((w: WordsType) => w.id === wordId);

	console.log('WORDS: ', words);
	console.log('PARAMS: ', wordId, wordName);
	console.log('WORD: ', word);

	return <WordInfo name={word?.name} transcription={word?.transcription} />;
};

export default WordCardPage;
