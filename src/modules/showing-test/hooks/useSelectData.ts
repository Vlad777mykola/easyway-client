import { useState, useEffect, useMemo } from 'react';
import { getReadyQuestion } from '../functions/fetchDefinition';

export const useSelectData = (props: string[]): string[][] | null => {
	const [answers, setAnswers] = useState<string[][] | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			const result: string[][] = await getReadyQuestion(props);
			console.log('/////// ', props);
			console.log('/////// ', result);
			if (result.length > 1) {
				setAnswers(result);
			} else {
				setAnswers(null);
			}
		};

		fetchData();
	}, [props]);

	return useMemo(() => answers, [answers]);
};
