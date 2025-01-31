import { useState, useEffect, useMemo } from 'react';
import { getReadyQuestion, VariantsType } from '../functions/fetchDefinition';

export const useSelectData = (props: string[]) => {
	const [answers, setAnswers] = useState<VariantsType | null>(null);

	console.log('PROPS USE SELECT DATA: ', props);

	useEffect(() => {
		(async () => {
			const result = await getReadyQuestion(props);
			if (result) {
				setAnswers(result as VariantsType);
			}
		})();
	}, [props]);

	return useMemo(() => answers, [answers]);
};
