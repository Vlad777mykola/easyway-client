export const speak = (word: string) => {
	const utterance = new SpeechSynthesisUtterance(word);
	utterance.lang = 'en-US';
	window.speechSynthesis.cancel(); // add because without cancel does not work, maybe utterance is stuck
	window.speechSynthesis.speak(utterance);
};
