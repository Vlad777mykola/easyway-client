import { useWords } from '@/shared/api-hooks/useWords';
import { Wrapper } from '@/ui-components/Wrapper';
import { Input } from '@/ui-components/Input';
import { useState } from 'react';
import { WordCard } from '../word-card/WordCard';

import styles from './main.module.css';

const { Search } = Input;

type WordsType = {
	id: string;
	name: string;
	transcription: string;
	translate: string;
	type: string;
	useCase: string;
	variants: string[];
};

export const Main = () => {
	const [word, setWord] = useState<string>('');
	const { data: words, refetch } = useWords(word);

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
			<div className={styles.cards}>
				{words?.length > 0 && words.map((w: WordsType) => <WordCard {...w} key={w.id} />)}
			</div>
		</>
	);
};
