import React from 'react';
import styles from './artem.module.css';

interface CardProps {
	image: string;
	title: string;
	subtitle: string;
}

const Card3: React.FC<CardProps> = ({ image, title, subtitle }) => {
	return (
		<div className={styles.Card3}>
			<img src={image} alt={title} className={styles.cardImage} />
			<h2>{title}</h2>
			<p>{subtitle}</p>
		</div>
	);
};
export default Card3;
