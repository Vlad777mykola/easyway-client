import styles from './artem.module.css';
import cardPht1 from './img/cardPht1.svg';
import cardPht2 from './img/cardPht2.jpg';
import cardPht3 from './img/cardPht3.svg';

export const ArtemCards = () => {
	const data1 = {
		image: cardPht1,
		title: ' Англійські ідіоми',
		subtitle:
			'Тут ви знайдете добірку англійських ідіом, класифікованих за темами слів для зручнішого доступу та кращого розуміння для вас.',
	};
	const data2 = {
		image: cardPht2,
		title: 'Англійські фразові дієслова',
		subtitle:
			'Тут ви знайдете добірку англійських ідіом, класифікованих за темами для зручнішого доступу та кращого розуміння.',
	};
	const data3 = {
		image: cardPht3,
		title: 'Стійкі вирази',
		subtitle:
			'Тут ви знайдете популярні стійкі вирази англійською мовою, які допоможуть зробити вашу мову більш живою та природною. Наприклад, break the ice означає розрядити атмосферу і почати розмову, piece of cake — це щось дуже легке, under the weather — відчувати себе погано, а spill the beans — розповісти секрет. Використовуйте ці вирази в повсякденному спілкуванні, і ви зможете виразити свої думки більш яскраво та точно',
	};

	return (
		<div className={styles.cardsContainer}>
			<div className={styles.containerTop}>
				<div className={styles.card1}>
					<img src={data1.image} alt="Ідіоми" className={styles.cardImage} />
					<h2>{data1.title}</h2>
					<p>{data1.subtitle}</p>
				</div>

				<div className={styles.card2}>
					<img src={data2.image} alt="Фразові дієслова" className={styles.cardImage} />
					<h2>{data2.title}</h2>
					<p>{data2.subtitle}</p>
				</div>
			</div>

			<div className={styles.containerBottom}>
				<div className={styles.card3}>
					<img src={data3.image} alt="стійкі вирази" className={styles.cardImage} />
					<h2>{data3.title}</h2>
					<p>{data3.subtitle}</p>
				</div>
			</div>
		</div>
	);
};
