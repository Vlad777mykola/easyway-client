import { useWords } from '@/shared/api-hooks/useWords';
import { Wrapper } from '@/ui-components/Wrapper';
import { Input } from 'antd';
import { useState } from 'react';
import { WordCard } from '../word-card/WordCard';

const { Search } = Input;

const data = {
	id: '3c9918b4-e787-4464-8669-d05077c9ee1e',
	name: 'won',
	transcription: '/ˈdən/',
	translate: 'готовий, приготовлений',
	type: 'verb',
	useCase: 'cooked or prepared to the desired level of completion',
	variants: ['done', 'make', 'action'],
};

type WordsType = typeof data;

export const Main = () => {
	const [word, setWord] = useState<string>('');
	const { data: words, refetch } = useWords(word);
	console.log(words, data);
	console.log(words?.length > 0);
	return (
		<>
			<Wrapper>
				<Search
					placeholder="input search text"
					allowClear
					enterButton="Search"
					size="large"
					onChange={(e) => setWord(e.target.value)}
					onSearch={() => refetch()}
				/>
			</Wrapper>
			{words?.length > 0 && words.map((w: WordsType) => <WordCard {...w} />)}
		</>
	);
};
