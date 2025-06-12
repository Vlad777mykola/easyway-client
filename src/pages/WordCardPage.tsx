import { useWords } from '@/shared/api-hooks/useWords';
import { useParams } from 'react-router-dom';
import type { WordsType } from '@/modules/words/components/main/Main';
import { WordInfo } from '@/modules/word-info/WordInfo';

const WordCardPage = () => {
	const { wordId, wordName } = useParams();
	const { data: words } = useWords(wordName || '');
	const word = words?.find((w: WordsType) => w.id === wordId);

	return (
		<WordInfo
			name={word?.name}
			transcription={word?.transcription}
			translate={word?.translate}
			type="verb"
		/>
	);
};

export default WordCardPage;
