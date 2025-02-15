import { Button } from '@/ui-components/Button';
import { InfinitiveModeType } from '../Pagination';
import styles from './infinitive.module.css';
import { CircleButton } from '@/ui-components/CircleButton';
import { Icon } from '@/ui-components/Icon';
import { STEP } from '../constants/constants';
import { swapQuestion } from '../services/service';
import { DOTS, usePagination } from '../hooks/usePagination';
import { useState } from 'react';

const SIBLING_COUNT = 1;
const PAGE_SIZE = 1;

export const Infinitive = (props: InfinitiveModeType) => {
	const currentIndex: number = props.ids.findIndex((id) => id === props.currentId);
	const [currentTest, setCurrentTest] = useState(1);
	console.log('LOGS: ', props.ids.length);
	console.log('CURRENT TEST: ', currentTest);
	const paginationRange = usePagination({
		totalCount: props.ids.length,
		pageSize: PAGE_SIZE,
		siblingCount: SIBLING_COUNT,
		currentPage: currentIndex + 1,
	});

	let lastPage = paginationRange[paginationRange.length - 1];

	// if (currentTest === 0 || paginationRange.length < 2) {
	// 	return null;
	// }

	console.log('PAGINATION RANGE: ', paginationRange);
	console.log('PAGINATION RANGE LENGTH: ', paginationRange.length);
	console.log('PROPS: ', props);

	return (
		<>
			<div className={styles.prevQuestion}>
				<CircleButton
					type="default"
					size="large"
					onClick={() => {
						const firstIndex = currentIndex === 0;
						const moveIndex = firstIndex ? props.ids.length - 1 : currentIndex - 1;
						setCurrentTest(moveIndex + 1);
						swapQuestion(STEP.PREV, props.exerciseMode, currentIndex, props.ids, props.navigateTo);
					}}
				>
					<Icon icon="left" variant="dark" />
				</CircleButton>
			</div>
			<div className={styles.nextQuestion}>
				<CircleButton
					type="default"
					size="large"
					onClick={() => {
						const lastIndex = currentIndex === props.ids.length - 1;
						const moveIndex = lastIndex ? 0 : currentIndex + 1;
						console.log('MOVE INDEX: ', moveIndex);
						setCurrentTest(moveIndex + 1);
						swapQuestion(STEP.NEXT, props.exerciseMode, currentIndex, props.ids, props.navigateTo);
					}}
				>
					<Icon icon="right" variant="dark" />
				</CircleButton>
			</div>
			{/* <div className={styles.pagination}>
				{props.ids.map((id, index) => (
					<Button
						key={id}
						size="small"
						type={currentIndex === index ? 'primary' : 'default'}
						onClick={() => props.navigateTo(id)}
					>
						{index + 1}
					</Button>
				))}
			</div> */}
			<div>
				{props.ids.map((id, index) => {
					if (paginationRange[index] === DOTS) {
						return <span key={index}>&#8230;</span>;
					}
					if (index > paginationRange.length) {
						return;
					}
					console.log('ID IN MAP: ', id);
					return (
						<Button
							key={id}
							size="small"
							type={currentIndex === index ? 'primary' : 'default'}
							onClick={() => props.navigateTo(id)}
						>
							{paginationRange[index]}
						</Button>
					);
				})}
			</div>
		</>
	);
};
