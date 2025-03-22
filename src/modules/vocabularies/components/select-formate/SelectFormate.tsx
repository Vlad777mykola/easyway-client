import { ExerciseUI } from '@/shared/components/exercise-content/ExerciseContent';
import { SelectingUI } from '@/shared/components/selecting-formate-ui/SelectingUI';
import { FormateType } from './types';

export const SelectFormate = (props: FormateType) => {
	return (
		<>
			{!props.isSelectingFormate && <ExerciseUI {...props} />}
			{props.isSelectingFormate && <SelectingUI {...props} />}
		</>
	);
};
