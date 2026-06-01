import { useQueryParam } from '@/shared/hooks/use-query-params';
import { EXERCISE_CONFIG } from '@/store/dictionary/constants';

export const useConfigStings = () => {
	const { getParam } = useQueryParam();

	return {
		getMode: () => getParam(EXERCISE_CONFIG.MODE) || 'randomMode',
		getFormate: () => getParam(EXERCISE_CONFIG.FORMATE) || 'selectingFormate',
		getAutoPlay: () => getParam(EXERCISE_CONFIG.AUTO_PLAY, 'boolean') || false,
		getTotalCorrectResponse: () => getParam(EXERCISE_CONFIG.TOTAL_CORRECT_RESPONSE, 'number') || 5,
	};
};
