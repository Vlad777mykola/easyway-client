import React from 'react';
import styles from './artem.module.css'; // або відповідний стиль для кожної картки

interface CardProps {
	image: string;
	title: string;
	subtitle: string;
}

const Card1: React.FC<CardProps> = ({ image, title, subtitle }) => {
	return (
		<div className={styles.Card1}>
			<img src={image} alt={title} className={styles.cardImage} />
			<h2>{title}</h2>
			<p>{subtitle}</p>
		</div>
	);
};

export default Card1;
