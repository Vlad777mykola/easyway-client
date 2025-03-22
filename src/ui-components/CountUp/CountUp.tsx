import { useState, useEffect } from 'react';

export const CountUp = ({ end = 100, duration = 2000 }) => {
	const [count, setCount] = useState(0);

	useEffect(() => {
		let start = 0;
		const increment = end / (duration / 16);

		const interval = setInterval(() => {
			start += increment;
			if (start >= end) {
				setCount(end);
				clearInterval(interval);
			} else {
				setCount(Math.ceil(start));
			}
		}, 16); // Runs every 16ms (~60fps)

		return () => clearInterval(interval);
	}, [end, duration]);

	return <span>{count}</span>;
};
