import { Tag } from '@/ui-components/Tag';
import { Typography } from '@/ui-components/Typography';
import { FormItems } from '../../types/form-filters.types';
import styles from './tagSection.module.css';

export const TagSection = ({
	title,
	keyOfForm,
	formItems,
	showOrHideTag,
}: {
	title: string;
	keyOfForm: keyof FormItems;
	formItems: FormItems;
	showOrHideTag: (key: keyof FormItems, value: string) => void;
}) => (
	<div className={styles.typeTags}>
		<Typography.Text className={styles.titleType}>{title}: </Typography.Text>
		<div className={styles.tagsContainer}>
			{formItems[keyOfForm]?.map((item) => (
				<Tag
					key={item}
					className={styles.tag}
					color="blue"
					onClose={() => {
						showOrHideTag(keyOfForm, item);
					}}
					closable
				>
					{item}
				</Tag>
			))}
		</div>
	</div>
);
