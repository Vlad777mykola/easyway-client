import { useContext, useRef } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Wrapper } from '@/ui-components/Wrapper';
import { Menu } from '@/ui-components/Menu';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { FieldsDataType, SideBarType } from './type';
import { FieldComponent } from './components/FieldComponent';
import styles from './sidebar.module.css';

export type Clear = { clear: () => void };

export type Ref = {
	current: Clear[];
};

export const Sidebar = <T extends FieldsDataType>({
	title,
	fieldsData,
	onClear,
	onSearch,
	onChange,
}: SideBarType<T>) => {
	const { isMobile, isLaptop } = useContext(ScreenSizeContext);

	const refs: Ref = useRef([]);

	console.log('REFS', refs);

	const sideConfigComponent = (
		<Wrapper>
			<div className={styles.filterContainer}>
				<h2 className={styles.title}>{title}</h2>
				{fieldsData &&
					fieldsData.map((item, index) => (
						<FieldComponent
							ref={(el) => (refs.current[index] = el as Clear)}
							key={item.keyValue}
							item={item}
							onChange={onChange}
						/>
					))}
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
							<Button block onClick={() => onClear(refs)}>
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
