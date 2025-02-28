import { WrapperCard } from '@/ui-components/Wrapper-card';

export const Artem = () => {
	const data = {
		name: 'Artem',
		title: 'Ідіоми',
		subtitle:
			'Тут ви знайдете добірку англійських ідіом, класифікованих за темами для зручнішого доступу та кращого розуміння.',
	};
	const data2 = {
		title: 'Англійські фразові дієслова',
		subtitle:
			'Тут ви знайдете добірку англійських ідіом, класифікованих за темами для зручнішого доступу та кращого розуміння.',
	};
	return (
		<WrapperCard>
			<div>
				{data.name} Page
				<div>
					Artem card 1 <br />
					<div>{data.title}</div>
					<div>{data.subtitle}</div>
				</div>
				<div>
					Artem card 2 <br />
					<div>{data2.title}</div>
					<div>{data2.subtitle}</div>
				</div>
			</div>
		</WrapperCard>
	);
};

export default Artem;
