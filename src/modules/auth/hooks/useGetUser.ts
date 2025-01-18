import { gql, useQuery } from '@apollo/client';
import { User } from '@/shared/models/User';

const GET_ME = gql`
	query Me {
		me {
			_id
			email
		}
	}
`;

const useGetUser = () => {
	return useQuery<{ me: User }>(GET_ME);
};

export { useGetUser };
