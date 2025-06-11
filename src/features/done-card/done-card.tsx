import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { Result } from '@/ui-components/Result';

export const DoneCard = ({ onClick }: { onClick: () => void }) => {
	return (
		<Result
			icon={<Icon icon="smile" size="xl" />}
			title="Great, you have done all the exercise!"
			extra={
				<Button onClick={onClick} type="primary">
					Next
				</Button>
			}
		/>
	);
};
