import { ExerciseUI } from '../exercise-content/ExerciseContent';
import { SelectingUI } from '../selecting-formate-ui/SelectingUI';
import { FormateType } from './types';

export const SelectFormate = (props: FormateType) => {
	return (
		<>
			{!props.isSelectingFormate && <ExerciseUI {...props} />}
			{props.isSelectingFormate && <SelectingUI {...props} />}
		</>
	);
};
