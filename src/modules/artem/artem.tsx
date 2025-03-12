import styles from '../styles/artem.module.css';
import cardPht1 from './img/cardPht1.svg';
import cardPht2 from './img/cardPht2.jpg';
import cardPht3 from './img/cardPht3.svg';
import { Card1, Card2, Card3 } from '@/modules/artem/components/index.ts'; // додаємо index.ts

export const ArtemCards = () => {
	const data1 = {
		image: cardPht1,
		title: 'Англійські ідіоми',
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
			<Card1 image={data1.image} title={data1.title} subtitle={data1.subtitle} />
			<Card2 image={data2.image} title={data2.title} subtitle={data2.subtitle} />
			<Card3 image={data3.image} title={data3.title} subtitle={data3.subtitle} />
		</div>
	);
};

export default ArtemCards;
