import { useNavigate, useParams } from 'react-router-dom';
import { ContentContainer } from '@/ui-components/Content-Container';
import { ALL_QUESTIONS_BY_ID } from '@/shared/constants/questions/collections';
import { List } from '@/features/list';

export const QuestionDetails = () => {
	const { questionsId = '' } = useParams();
	const navigate = useNavigate();
	const questions = ALL_QUESTIONS_BY_ID.get(questionsId);

	const onClick = (id: string) => {
		navigate(`/questions/${questionsId}/word/${id}`);
	};

	return (
		<ContentContainer>
			<ContentContainer.Content>
				{questions && <List data={questions} onClick={onClick} />}
			</ContentContainer.Content>
		</ContentContainer>
	);
};
