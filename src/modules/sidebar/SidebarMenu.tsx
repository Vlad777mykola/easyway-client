import { useContext } from 'react';
import { Props, Sidebar } from './Sidebar';
import { ScreenSizeContext } from '@/context/ScreenSizeContext';
import { Menu } from '@/ui-components/Menu';
import styles from './sidebarMenu.module.css';

export const SidebarMenu = ({ title, selectData, onSearch, onChange }: Props) => {
	const { isMobile, isLaptop, isDesktop } = useContext(ScreenSizeContext);

	if (isMobile || isLaptop) {
		return (
			<div className={styles.filterMenu}>
				<Menu
					icon="filter"
					side="left"
					Items={
						<Sidebar
							title={title}
							selectData={selectData}
							onSearch={onSearch}
							onChange={onChange}
						/>
					}
				/>
			</div>
		);
	}

	if (isDesktop) {
		return (
			<div className={styles.filter}>
				<Sidebar title={title} selectData={selectData} onSearch={onSearch} onChange={onChange} />
			</div>
		);
	}
};
