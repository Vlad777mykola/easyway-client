import { useRef } from 'react';
import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Wrapper } from '@/ui-components/Wrapper';
import { FieldsDataType, SideBarType } from './type';
import { FieldComponent } from './components/FieldComponent';
import styles from './sidebar.module.css';

export type Clear = { clear: () => void };

type Ref = {
	current: Clear[];
};

export const Sidebar = <T extends FieldsDataType>({
	title,
	fieldsData,
	onClear,
	onSearch,
	onChange,
}: SideBarType<T>) => {
	// const { isMobile, isLaptop } = usePlatformData();

	const refs: Ref = useRef<Clear[]>([]);

	const handleClear = () => {
		if (onClear) {
			onClear();
			refs.current.forEach((_, index) => refs.current[index].clear());
		}
	};

	const sideConfigComponent = (
		<Wrapper isSticky>
			<div className={styles.filterContainer}>
				<h2 className={styles.title}>{title}</h2>
				{fieldsData &&
					fieldsData.map((item, index) => (
						<FieldComponent
							ref={(el: Clear) => {
								refs.current[index] = el;
							}}
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
							<Button block onClick={handleClear}>
								<Icon icon="clear" /> Clear
							</Button>
						</div>
					)}
				</div>
			)}
		</Wrapper>
	);

	// if (isMobile || isLaptop) {
	// 	return (
	// 		<div className={styles.filterMenu}>
	// 			<Menu icon="filter" side="left" Items={sideConfigComponent} />
	// 		</div>
	// 	);
	// }

	return sideConfigComponent;
};
