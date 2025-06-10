import { Icon } from '@/ui-components/Icon';
import { Button } from '@/ui-components/Button';
import { speak } from '@/shared/utils/speak';
import styles from './wordInfo.module.css';

export const WordInfo = ({ name, transcription }: { name: string; transcription: string }) => {
	return (
		<div className={styles.wordInfo}>
			<div className={styles.mainWordInfo}>
				<div className={styles.topInfo}>
					<div className={styles.nameBaseInfo}>
						<div className={styles.nameContainer}>
							<div className={styles.writeAndSound}>
								<span className={styles.name}>{name}</span>
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
						<span className={styles.transcription}>{transcription}</span>
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
					<span className={styles.explanation}>Визначення та Значення "do"</span>
				</div>
			</div>
		</div>
	);
};
