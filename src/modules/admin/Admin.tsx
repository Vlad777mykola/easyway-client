import { FormFilters } from './components/form-filters/FormFilters';
import { FormTabs } from '@/shared/components/form-tabs/form-tabs/FormTabs';
import { FormTab } from '@/shared/components/form-tabs/form-tab/FormTab';
import { SecondTab } from './components/second-tab/SecondTab';

import styles from './admin.module.css';

export const Admin = () => {
	return (
		<div className={styles.adminContainer}>
			<div className={styles.formsContainer}>
				<FormTabs>
					<FormTab label="Filters">
						<FormFilters />
					</FormTab>

					<FormTab label="Second Tab">
						<SecondTab />
					</FormTab>
				</FormTabs>
			</div>
		</div>
	);
};
