export const TOPIC_TENSES = {
	PRESENT_SIMPLE: 'Present Simple',
	PAST_SIMPLE: 'Past Simple',
	FUTURE_SIMPLE: 'Future Simple',
	PRESENT_CONTINUOUS: 'Present Continuous',
	PAST_CONTINUOUS: 'Past Continuous',
	FUTURE_CONTINUOUS: 'Future Continuous',
	PRESENT_PERFECT: 'Present Perfect',
	PRESENT_PERFECT_CONTINUOUS: 'Present Perfect Continuous',
	FUTURE_PERFECT: 'Future Perfect',
	FUTURE_PERFECT_CONTINUOUS: 'Future Perfect Continuous',
	FUTURE_WITH_GOING_TO: 'Future With Going To',
	PAST_WITH_GOING_TO: 'Past With Going To',
	TALKING_ABOUT_THE_PRESENT: 'Talking About The Present',
	TALKING_ABOUT_THE_PAST: 'Talking About The Past',
	TALKING_ABOUT_THE_FUTURE: 'Talking About The Future',
	ASPECTS: 'Aspects',
} as const;

export const LEVEL = {
	BEGINNER: 'beginner',
	INTERMEDIATE: 'intermediate',
	ADVANCED: 'advanced',
} as const;

export const LEARNING_STYLE = {
	SELECTING_MATCHING: 'Selecting/Matching',
	VISUAL_LEARNER: 'Visual Learner',
	AUDITORY_LEARNER: 'Auditory Learner',
	WRITING_LEARNER: 'Writing Learner',
} as const;

export const LEARN_BY_INTEREST = {
	MOVIES_INTEREST: 'Movies/Series',
	MUSIC: 'Music',
	BOOKS: 'Books',
	NEWS_BLOGS: 'News/Blogs',
};

export const LEARN_BY_SKILL = {
	LISTENING: 'Listening',
	SPEAKING: 'Speaking',
	READING: 'Reading',
	WRITING: 'Writing',
};
