// import { useParams } from 'react-router-dom';
// import { PathParams, ROUTES } from '@/shared/model/routes';
import { WordsSearch } from '@/modules/words';

function DictionaryPage() {
	// const params = useParams<PathParams[typeof ROUTES.BOARD]>();
	return <WordsSearch />;
}

export const Component = DictionaryPage;
