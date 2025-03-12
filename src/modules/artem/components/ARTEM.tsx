import React from 'react';
import Card1 from '@/modules/artem/components/Card1';
import Card2 from '@/modules/artem/components/Card2';
import Card3 from '@/modules/artem/components/Card3';
import styles1 from './artem.module.css';
import styles2 from './wrapperCard.module.css';
export const Artem = () => {
	return (
		<div className={styles2.wrapperCard}>
			<div className={styles1.cardsContainer}>
				<div className={styles1.containerTop}>
					<Card1
						image="src/modules/artem/components/img/cardPht1.svg"
						title="Англійські ідіоми"
						subtitle="Тут ви знайдете добірку англійських ідіом, класифікованих за темами для зручнішого доступу та кращого розуміння для вас."
					/>
					<Card2
						image="src/modules/artem/components/img/cardPht2.jpg"
						title="Фразові дієслова"
						subtitle="Тут ви знайдете добірку англійських ідіом, класифікованих за темами для зручнішого доступу та кращого розуміння."
					/>
				</div>
				<div className={styles1.containerBottom}>
					<Card3
						image="src/modules/artem/components/img/cardPht3.svg"
						title="Стійкі вирази"
						subtitle="Тут ви знайдете популярні стійкі вирази англійською мовою, які допоможуть зробити вашу мову більш живою та природною."
					/>
				</div>
			</div>
		</div>
	);
};

export default Artem;
