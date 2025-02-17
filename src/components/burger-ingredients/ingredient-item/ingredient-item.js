import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';

function IngredientItem({ title, price, img }) {
	return (
		<li className={styles.card}>
			<img src={img} alt={title} />
			<div className={`${styles.cardText}`}>
				<span className='text text_type_digits-default mr-2'>{price}</span>
				<CurrencyIcon type='primary' />
			</div>
			<div className={`${styles.cardText} text text_type_main-default`}>
				{title}
			</div>
		</li>
	);
}

export default IngredientItem;
