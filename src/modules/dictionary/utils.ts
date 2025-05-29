export const formatNavigate = {
	dictionaries: (collectionId: string) => `/dictionaries/${collectionId}`,
	dictionariesWord: (collectionId: string, id: string) =>
		`/dictionaries/${collectionId}/word/${id}`,
};
