import { Icon } from '@/ui-components/Icon';
import style from './footer.module.css';

export const Footer = () => {
	return (
		<div className={style.footerRedes}>
			<ul className={style.footerRedesWrapper}>
				<li className={style.linkList}>
					<a className={style.footerLink} href="#">
						<Icon icon="facebook" variant="on-dark" size="m" />
						<p className={style.nameOfLink}>FACEBOOK</p>
					</a>
				</li>
				<li className={style.linkList}>
					<a className={style.footerLink} href="#">
						<Icon icon="twitter" variant="on-dark" size="m" />
						<p className={style.nameOfLink}>TWITTER</p>
					</a>
				</li>
				<li className={style.linkList}>
					<a className={style.footerLink} href="#">
						<Icon icon="instagram" variant="on-dark" size="m" />
						<p className={style.nameOfLink}>INSTAGRAM</p>
					</a>
				</li>
				<li className={style.linkList}>
					<a className={style.footerLink} href="#">
						<Icon icon="youtube" variant="on-dark" size="m" />
						<p className={style.nameOfLink}>YOUTUBE</p>
					</a>
				</li>
			</ul>
			<div className={style.separator}></div>
			<p className={style.footerTextTo}>Copyright @ 2024</p>
		</div>
	);
};
