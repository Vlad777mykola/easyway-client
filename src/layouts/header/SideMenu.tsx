import { Link } from 'react-router-dom';
import styles from './sideMenu.module.css';

type Item = {
	name: string;
	link: string;
};

type Props = {
	list: Item[];
	img?: string;
	imgSpan?: string;
};

export const SideMenu = ({ list, img, imgSpan }: Props) => {
	return (
		<div className={styles.sideMenu}>
			<div className={styles.headerLeftMenuList}>
				{img && (
					<div className={styles.imageContainer}>
						<img className={styles.image} src={img} />
						<span className={styles.imgSpan}>{imgSpan}</span>
					</div>
				)}
				{img && <div className={styles.separateLine}></div>}
				{list.map((item) => (
					<Link to={item.link} className={styles.actionListContent}>
						{item.name}
					</Link>
				))}
			</div>
		</div>
	);
};
