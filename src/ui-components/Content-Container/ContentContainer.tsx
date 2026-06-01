import { ReactNode } from 'react';
import styles from './container.module.css';

const Header = ({ children }: { children: ReactNode }) => {
	return <div className={styles.header}>{children}</div>;
};
const Sidebar = ({ children }: { children: ReactNode }) => {
	return <div className={styles.sidebar}>{children}</div>;
};
const Content = ({ children }: { children: ReactNode }) => {
	return <div className={styles.content}>{children}</div>;
};

export const ContentContainer = ({ children }: { children: ReactNode }) => {
	return <div className={styles.collectionsContainer}>{children}</div>;
};

ContentContainer.Header = Header;
ContentContainer.Content = Content;
ContentContainer.Sidebar = Sidebar;
