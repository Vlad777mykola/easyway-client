import { useState, useEffect, useMemo } from 'react';
import { getReadyQuestion, VariantsType } from '../functions/fetchDefinition';

export const useSelectData = (props: string[]) => {
	const [answers, setAnswers] = useState<VariantsType | null>(null);

	useEffect(() => {
		(async () => {
			const result = await getReadyQuestion(props);
			if (result) {
				setAnswers(result as VariantsType);
			}
		})();
	}, [props]);

	console.log('ANSWERS USE SELECT DATA: ', answers);

	return useMemo(() => answers, [answers]);
};
