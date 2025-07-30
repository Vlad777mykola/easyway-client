export const questionId_1 = [
	{
		id: '1',
		exerciseAnswer: 'Position Static',
		exercise: 'Position Static',
		explanation: 'Position CSS.',
		explanationVariants: [
			'Elements with position: static can be moved using the top, right, bottom, or left properties.',
			'This is the default value for all elements in CSS.',
			'Setting position: static causes the element to float above other elements like absolute positioning.',
		],
		explanationAnswer: 'This is the default value for all elements in CSS.',
	},
	{
		id: '2',
		exerciseAnswer: 'Position Relative',
		exercise: 'Position Relative',
		explanation: 'Position CSS.',
		explanationVariants: [
			'Means that the element remains in the document flow, but you can move it using top, left, right, bottom relative to its normal position.',
			'An element with position: relative is removed from the normal document flow like absolute elements.',
			'position: relative makes the element scroll with the page like fixed positioning.',
		],
		explanationAnswer:
			'Means that the element remains in the document flow, but you can move it using top, left, right, bottom relative to its normal position.',
	},
	{
		id: '3',
		exerciseAnswer: 'Position Absolute',
		exercise: 'Position Absolute',
		explanation: 'Position CSS.',
		explanationVariants: [
			'An element with position: absolute is always positioned relative to the entire page (viewport).',
			'Absolutely positioned elements take up space in the normal document flow.',
			'absolute means that the element is removed from the document flow and placed exactly at the top, left, right, bottom coordinates relative to the nearest positioned ancestor (i.e. an ancestor with position: relative, absolute, fixed, or sticky).',
		],
		explanationAnswer:
			'absolute means that the element is removed from the document flow and placed exactly at the top, left, right, bottom coordinates relative to the nearest positioned ancestor (i.e. an ancestor with position: relative, absolute, fixed, or sticky).',
	},
	{
		id: '4',
		exerciseAnswer: 'Position',
		exercise: 'Position',
		explanation: 'Position CSS',
		explanationVariants: [
			'The position property only affects elements with display: flex or display: grid.',
			'In CSS, the position property determines how an element is positioned in a document.',
			'Using position: fixed will keep the element in place only within its parent container.',
		],
		explanationAnswer:
			'In CSS, the position property determines how an element is positioned in a document.',
	},
	{
		id: '5',
		exerciseAnswer: 'Position Fixed',
		exercise: 'Position Fixed',
		explanation: 'Position CSS',
		explanationVariants: [
			'This is a type of positioning where the element is anchored to the browser window, not to any container or document flow.',
			'Elements with position: fixed scroll with the rest of the page.',
			'position: fixed positions the element relative to its closest positioned ancestor.',
		],
		explanationAnswer:
			'This is a type of positioning where the element is anchored to the browser window, not to any container or document flow.',
	},
	{
		id: '6',
		exerciseAnswer: 'Position Sticky',
		exercise: 'Position Sticky',
		explanation: 'Position CSS',
		explanationVariants: [
			"Sticky positioning works even if the element's parent has overflow: hidden.",
			'position: sticky makes the element always stay fixed at the top of the screen, regardless of scrolling.',
			'The element stays in its usual place until it reaches a given position (for example, top: 0), after which it "sticks" to the edge of the window when scrolling.',
		],
		explanationAnswer:
			'The element stays in its usual place until it reaches a given position (for example, top: 0), after which it "sticks" to the edge of the window when scrolling.',
	},
	{
		id: '7',
		exerciseAnswer: 'Overflow',
		exercise: 'Overflow',
		explanation: 'Overflow CSS',
		explanationVariants: [
			'Setting overflow: hidden will add scrollbars to the element automatically.',
			"The overflow property controls what to do with content that overflows the bounds of a block (container) if it doesn't fit.",
			'overflow only applies to block-level elements.',
		],
		explanationAnswer:
			"The overflow property controls what to do with content that overflows the bounds of a block (container) if it doesn't fit.",
	},
	{
		id: '8',
		exerciseAnswer: 'Overflow Visible',
		exercise: 'Overflow Visible',
		explanation: 'Overflow CSS',
		explanationVariants: [
			"Content that extends beyond the element's boundaries is NOT clipped or scrolled—it simply continues outside the block.",
			'overflow: visible clips the content and hides anything that overflows the box.',
			'Using overflow: visible will add scrollbars when content is too large.',
		],
		explanationAnswer:
			"Content that extends beyond the element's boundaries is NOT clipped or scrolled—it simply continues outside the block.",
	},
	{
		id: '9',
		exerciseAnswer: 'Overflow Hidden',
		exercise: 'Overflow Hidden',
		explanation: 'Overflow CSS',
		explanationVariants: [
			'All the "extra" content will not be visible. No scrolling, no edges - it is simply cut off.',
			'overflow: hidden adds scrollbars to access hidden content.',
			'overflow: hidden resizes the content to fit inside the container',
		],
		explanationAnswer:
			'All the "extra" content will not be visible. No scrolling, no edges - it is simply cut off.',
	},
	{
		id: '10',
		exerciseAnswer: 'Overflow Scroll',
		exercise: 'Overflow Scroll',
		explanation: 'Overflow CSS',
		explanationVariants: [
			'overflow: scroll only shows scrollbars if the content overflows the element.',
			'overflow: scroll automatically hides overflowing content without providing scrollbars.',
			"The content doesn't go beyond the borders - you have to scroll, even if scrolling isn't necessary.",
		],
		explanationAnswer:
			"The content doesn't go beyond the borders - you have to scroll, even if scrolling isn't necessary.",
	},
];

// export const questionId_2 = [
// 	{
// 		id: '1',
// 		exerciseAnswer: 'Head',
// 		exercise: 'Голова',
// 		explanation:
// 			'The upper part of the human body that contains the brain, eyes, ears, nose, and mouth.',
// 	},
// 	{
// 		id: '2',
// 		exerciseAnswer: 'Face',
// 		exercise: 'Обличчя',
// 		explanation: "The front part of a person's head including the eyes, nose, and mouth.",
// 	},
// 	{
// 		id: '3',
// 		exerciseAnswer: 'Eye',
// 		exercise: 'Око',
// 		explanation: 'The organ of sight in humans and animals.',
// 	},
// 	{
// 		id: '4',
// 		exerciseAnswer: 'Nose',
// 		exercise: 'Ніс',
// 		explanation: 'The part of the face used for smelling and breathing.',
// 	},
// ];

// export const questionId_3 = [
// 	{
// 		id: '1',
// 		exerciseAnswer: 'Shirt',
// 		exercise: 'Сорочка',
// 		explanation: 'A piece of clothing worn on the upper body, usually with buttons and a collar.',
// 	},
// 	{
// 		id: '2',
// 		exerciseAnswer: 'T-shirt',
// 		exercise: 'Футболка',
// 		explanation: 'A casual short-sleeved top, usually made of cotton.',
// 	},
// 	{
// 		id: '3',
// 		exerciseAnswer: 'Jeans',
// 		exercise: 'Джинси',
// 		explanation: 'Trousers made of denim fabric, often blue in color.',
// 	},
// 	{
// 		id: '4',
// 		exerciseAnswer: 'Jacket',
// 		exercise: 'Куртка',
// 		explanation: 'A short coat worn over other clothes for warmth or style.',
// 	},
// ];

// export const questionId_4 = [
// 	{
// 		id: '1',
// 		exerciseAnswer: 'Tall',
// 		exercise: 'Високий',
// 		explanation: 'Having a greater than average height.',
// 	},
// 	{
// 		id: '2',
// 		exerciseAnswer: 'Short',
// 		exercise: 'Низький',
// 		explanation: 'Having a small height.',
// 	},
// 	{
// 		id: '3',
// 		exerciseAnswer: 'Slim',
// 		exercise: 'Стрункий',
// 		explanation: 'Thin in an attractive way.',
// 	},
// 	{
// 		id: '4',
// 		exerciseAnswer: 'Overweight',
// 		exercise: 'Зайва вага',
// 		explanation: 'Weighing more than is considered healthy.',
// 	},
// ];
