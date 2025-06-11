import { ExerciseUI } from '@/features/exercise-content';
import { SelectingUI } from '@/features/selecting-formate-ui';
import { FormateType } from './types';

export const SelectFormate = (props: FormateType) => {
	return (
		<>
			{!props.isSelectingFormate && <ExerciseUI {...props} />}
			{props.isSelectingFormate && <SelectingUI {...props} />}
		</>
	);
};
