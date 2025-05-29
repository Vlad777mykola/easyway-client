import { Tag } from '@/ui-components/Tag';
import { FormItems } from '../form-filters/FormFilters';
import styles from './tagSection.module.css';

export const TagSection = ({
	title,
	keyOfForm,
	formItems,
	showOrHideTag,
	setFormItems,
}: {
	title: string;
	keyOfForm: keyof FormItems;
	formItems: FormItems;
	showOrHideTag: (
		key: keyof FormItems,
		value: string,
		items: FormItems,
		setFunc: (updated: FormItems) => void,
	) => void;
	setFormItems: (updated: FormItems) => void;
}) => {
	console.log('FORM ITEMS TAG SECTION: ', formItems);

	return (
		<div className={styles.typeTags}>
			<span className={styles.titleType}>{title}: </span>
			<div className={styles.tagsContainer}>
				{formItems[keyOfForm]?.map((item) => (
					<Tag
						key={item}
						className={styles.tag}
						color="blue"
						onClose={() => {
							showOrHideTag(keyOfForm, item, formItems, setFormItems);
						}}
						closable
					>
						{item}
					</Tag>
				))}
			</div>
		</div>
	);
};
