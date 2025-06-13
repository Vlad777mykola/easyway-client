import { useParams } from 'react-router-dom';
import { useWords, WordsType } from '@/shared/api-hooks/useWords';
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
			type={word?.type}
		/>
	);
};

export default WordCardPage;
