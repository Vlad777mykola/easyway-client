export const speak = (word: string) => {
	const utterance = new SpeechSynthesisUtterance(word);
	utterance.lang = 'en-US';
	window.speechSynthesis.speak(utterance);
};
