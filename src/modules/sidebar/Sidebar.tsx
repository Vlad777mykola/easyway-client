import { useContext } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Wrapper } from '@/ui-components/Wrapper';
import styles from './sidebar.module.css';

import { Menu } from '@/ui-components/Menu';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { FieldsDataType, SideBarType } from './type';
import { FieldComponent } from './FieldComponent';

export const Sidebar = <T extends FieldsDataType>({
	title,
	fieldsData,
	onClear,
	onSearch,
	onChange,
}: SideBarType<T>) => {
	const { isMobile, isLaptop } = useContext(ScreenSizeContext);

	const sideConfigComponent = (
		<Wrapper>
			<div className={styles.filterContainer}>
				<h1 className={styles.title}>{title}</h1>
				{fieldsData && fieldsData.map((item) => <FieldComponent item={item} onChange={onChange} />)}
			</div>
			{(onSearch || onClear) && (
				<div className={styles.buttonsContainer}>
					{onSearch && (
						<div className={styles.buttonContainer}>
							<Button block onClick={onSearch}>
								<Icon icon="search" /> Search
							</Button>
						</div>
					)}
					{onClear && (
						<div className={styles.buttonContainer}>
							<Button block onClick={onClear}>
								<Icon icon="clear" /> Clear
							</Button>
						</div>
					)}
				</div>
			)}
		</Wrapper>
	);

	if (isMobile || isLaptop) {
		return (
			<div className={styles.filterMenu}>
				<Menu icon="filter" side="left" Items={sideConfigComponent} />
			</div>
		);
	}

	return <div className={styles.filter}>{sideConfigComponent}</div>;
};
