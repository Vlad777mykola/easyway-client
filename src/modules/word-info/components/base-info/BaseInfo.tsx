import { Button } from '@/ui-components/Button';
import { Icon } from '@/ui-components/Icon';
import { Typography } from '@/ui-components/Typography';
import { speak } from '@/shared/utils/speak';

import styles from './baseInfo.module.css';

export const BaseInfo = ({ name, transcription }: { name: string; transcription: string }) => {
	return (
		<div className={styles.mainWordInfo}>
			<div className={styles.topInfo}>
				<div className={styles.nameBaseInfo}>
					<div className={styles.nameContainer}>
						<div className={styles.writeAndSound}>
							<Typography.Text className={styles.name}>{name}</Typography.Text>
							<Button type="text" className={styles.noHover} onClick={() => speak(name)}>
								<Icon icon="sound" variant="dark" size="l" />
							</Button>
						</div>
						<div className={styles.buttonsContainer}>
							<Button color="default" variant="filled">
								<Icon icon="folder" variant="dark" />
							</Button>
							<Button color="default" variant="filled">
								<Icon icon="appStoreAdd" variant="dark" />
							</Button>
						</div>
					</div>
				</div>
				<div className={styles.transcriptionContainer}>
					<Typography.Text className={styles.transcription}>{transcription}</Typography.Text>
				</div>
				<div className={styles.buttonsMobile}>
					<div className={styles.buttonsContainer}>
						<Button color="default" variant="filled">
							<Icon icon="folder" variant="dark" />
						</Button>
						<Button color="default" variant="filled">
							<Icon icon="appStoreAdd" variant="dark" />
						</Button>
					</div>
				</div>
			</div>
			<div className={styles.meaning}>
				<div className={styles.buttonsContainer}>
					<Button type="primary" shape="round" size="large">
						Verb (3)
					</Button>
					<Button className={styles.noHover} type="text" size="large">
						Noun (1)
					</Button>
				</div>
				<Typography.Text className={styles.explanation}>
					Визначення та Значення "do"
				</Typography.Text>
			</div>
		</div>
	);
};
