import React from 'react';

type ContainerProps = {
	children: React.ReactNode;
};

export const Container: React.FC<ContainerProps> & {
	Header: typeof Header;
	Nav: typeof Nav;
	Content: typeof Content;
} = ({ children }) => {
	return <div className="container">{children}</div>;
};

// Define subcomponents
const Header: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <header className="header">{children}</header>;
};

const Nav: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <nav className="nav">{children}</nav>;
};

const Content: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	return <main className="content">{children}</main>;
};

// Attach subcomponents to the main Container
Container.Header = Header;
Container.Nav = Nav;
Container.Content = Content;
