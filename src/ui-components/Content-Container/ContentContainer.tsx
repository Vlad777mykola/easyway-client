// type ContainerProps = {
// 	children: React.ReactNode;
// };

// export const Container: React.FC<ContainerProps> & {
// 	Header: typeof Header;
// 	Nav: typeof Nav;
// 	Content: typeof Content;
// } = ({ children }) => {
// 	return <div className="container">{children}</div>;
// };

// const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// 	return <header className="header">{children}</header>;
// };

// const Nav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// 	return <nav className="nav">{children}</nav>;
// };

// const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
// 	return <main className="content">{children}</main>;
// };

// Container.Header = Header;
// Container.Nav = Nav;
// Container.Content = Content;

import { ReactNode } from 'react';
import styles from './container.module.css';

// const Context = createContext(null);

const Header = ({ children }: { children: ReactNode }) => {
	// const { test } = useContext(Context);
	return <div className={styles.header}>{children}</div>;
};
const Sidebar = ({ children }: { children: ReactNode }) => {
	return <div className={styles.sidebar}>{children}</div>;
};
const Content = ({ children }: { children: ReactNode }) => {
	return <div className={styles.content}>{children}</div>;
};

export const ContentContainer = ({ children }: { children: ReactNode }) => {
	return (
		// <Context.Provider value={{ test }}>
		<div className={styles.collectionsContainer}>{children}</div>
		// </Context.Provider>
	);
};

ContentContainer.Header = Header;
ContentContainer.Content = Content;
ContentContainer.Sidebar = Sidebar;
