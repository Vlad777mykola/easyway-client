import React, { useState, ReactNode } from 'react';
import { Button } from '@/ui-components/Button';

import styles from './formTabs.module.css';

export const FormTabs = ({ children }: { children: ReactNode }) => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);

	const childrenArray = React.Children.toArray(children) as React.ReactElement[];

	const tabLabels = childrenArray.map((child) => child.props.label);

	return (
		<div className={styles.formTabs}>
			<div className={styles.tapButtons}>
				{tabLabels.map((label: string, index: number) => (
					<div key={label} className={styles.tapButton}>
						<Button
							onClick={() => setActiveTabIndex(index)}
							block
							disabled={index === activeTabIndex}
						>
							{label}
						</Button>
					</div>
				))}
			</div>

			<div className={styles.tapContent}>{childrenArray[activeTabIndex]}</div>
		</div>
	);
};
