import React from 'react';
import styles from './Card2.module.css';

interface CardProps {
	image: string;
	title: string;
	subtitle: string;
}

const Card2: React.FC<CardProps> = ({ image, title, subtitle }) => {
	return (
		<div className={styles.Card2}>
			<img src={image} alt={title} className={styles.cardImage} />
			<h2>{title}</h2>
			<p>{subtitle}</p>
		</div>
	);
};

export default Card2;
