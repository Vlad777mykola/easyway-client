import { createContext, useState, Dispatch, SetStateAction, ReactNode } from 'react';

type CollectionsDataType = {
	getRandomExercise: boolean;
	correctResponse: number;
};

type UserContextType = {
	config: CollectionsDataType;
	setConfig: Dispatch<SetStateAction<CollectionsDataType>>;
};

const configData = {
	getRandomExercise: false,
	correctResponse: 0,
};

const CollectionsContext = createContext<UserContextType>({
	config: configData,
	setConfig: () => {},
});

const CollectionsProvider = ({ children }: { children: ReactNode }) => {
	const [config, setConfig] = useState<CollectionsDataType>(configData);

	return (
		<CollectionsContext.Provider value={{ config, setConfig }}>
			{children}
		</CollectionsContext.Provider>
	);
};

export { CollectionsContext, CollectionsProvider };
