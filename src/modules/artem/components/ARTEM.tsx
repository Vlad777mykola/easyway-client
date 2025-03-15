import Card1 from '@/modules/artem/components/Card1';
import Card2 from '@/modules/artem/components/Card2';
import Card3 from '@/modules/artem/components/Card3';
import styles1 from './artem.module.css';
import styles2 from '@/ui-components/Wrapper-card/wrapperCard.module.css';
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
						subtitle="Тут ви знайдете добірку англійських ідіом, які класифіковані за темами для зручнішого доступу та кращого розуміння."
					/>
				</div>
				<div className={styles1.containerBottom}>
					<Card3
						image="src/modules/artem/components/img/cardPht3.svg"
						title="Стійкі вирази"
						subtitle="Тут ви знайдете популярні стійкі вирази англійською мовою, які допоможуть зробити вашу мову більш живою та природною. Використання цих виразів не лише покращить ваше розуміння мови, але й дозволить ефективніше спілкуватися з носіями мови. Завдяки їм ви зможете легко висловлювати свої думки в різних ситуаціях, будь то різні буденні ситуації"
					/>
				</div>
			</div>
		</div>
	);
};

export default Artem;
