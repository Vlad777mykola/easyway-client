import { useState, useEffect, useMemo } from 'react';
import { getReadyQuestion } from '../functions/fetchDefinition';

export const useSelectData = (props: string[]) => {
	const [answers, setAnswers] = useState(null);

	useEffect(() => {
		(async () => {
			const result = await getReadyQuestion(props);
			if (result) {
				setAnswers(result);
			}
		})();
	}, [props]);

	return useMemo(() => answers, [answers]);
};
