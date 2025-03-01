import styles from './artem.module.css';
export const ArtemCards = () => {
	const data1 = {
		title: 'Ідіоми',
		subtitle:
			'Тут ви знайдете добірку англійських ідіом, класифікованих за темами слів для зручнішого доступу та кращого розуміння для вас.',
	};
	const data2 = {
		title: 'Англійські фразові дієслова',
		subtitle:
			'Тут ви знайдете добірку англійських ідіом, класифікованих за темами для зручнішого доступу та кращого розуміння.',
	};
	const data3 = {
		title: 'Стійкі вирази',
		subtitle:
			'Зібрані популярні стійкі вирази англійської мови, що допоможуть вам краще висловлювати свої думки.',
	};
	return (
		<div>
			<div className={styles.card1}>
				{/*card1 */}
				<div>
					<h2>{data1.title}</h2>
				</div>
				<div>
					<p>{data1.subtitle}</p>
				</div>
			</div>
			<div className={styles.card2}>
				{/* card2 */}
				<div>
					<h2>{data2.title}</h2>
				</div>
				<div>
					<p>{data2.subtitle}</p>
				</div>
			</div>
			<div className={styles.card3}>
				{/* card3 */}
				<div>
					<h2>{data3.title}</h2>
				</div>
				<div>
					<p>{data3.subtitle}</p>
				</div>
			</div>
		</div>
	);
};
