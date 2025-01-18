import { API_URL } from '@/shared/constants/urls';

const useLogout = () => {
	const logout = async () => {
		await fetch(`${API_URL}/auth/logout`, {
			method: 'POST',
		});
	};

	return { logout };
};

export { useLogout };
