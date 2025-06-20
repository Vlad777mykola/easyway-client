import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWords, WordsType } from '@/shared/api-hooks/useWords';
import { Wrapper } from '@/ui-components/Wrapper';
import { Input } from '@/ui-components/Input';
import { WordCard } from '../word-card/WordCard';

import styles from './main.module.css';

const { Search } = Input;

export const Main = () => {
	const [word, setWord] = useState<string>('w');
	const { data: words, refetch } = useWords(word);

	const navigate = useNavigate();

	const onClick = (name: string, id: string) => {
		navigate(`/word/${name}/${id}`);
	};

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
				{words?.length > 0 &&
					words.map((w: WordsType) => (
						<WordCard key={w.id} onClick={() => onClick(w.name, w.id)} {...w} />
					))}
			</div>
		</>
	);
};
