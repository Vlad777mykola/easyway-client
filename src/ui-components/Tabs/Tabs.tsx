import React from 'react';
import { Tabs as TabsAnt } from 'antd';
import type { TabsProps } from 'antd';

export interface TabItem {
	key: string;
	label: React.ReactNode;
	children: React.ReactNode;
}

export const Tabs = ({ items, ...props }: { items: TabItem[] } & TabsProps) => {
	return <TabsAnt items={items} {...props} />;
};
