import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';

function IngredientItem({  ingredient }) {
	const [show, setShow] = useState(false);
	const count = Math.floor(Math.random() * 2);
	console.log(count)

	function showDetails() {
		console.log(ingredient.name)
		setShow(true);
	}

	function hideDetails() {
		console.log("hideDetails")
		setShow(false);
	}
	return (
		<div>
		<li className={styles.card} onClick={showDetails}>
			<img src={ingredient.image} alt={ingredient.name} />
			<div className={`${styles.cardText}`}>
				<span className='text text_type_digits-default mr-2'>{ingredient.price}</span>
				<CurrencyIcon type='primary' />
			</div>
			<div className={`${styles.cardText} text text_type_main-default`}>
				{ingredient.name}
			</div>

		</li>
		<Counter count={count} size="default" extraClass={`${styles.count} "m-1"` } />
		{show && <IngredientDetails isOpen={show} onClose={hideDetails} ingredient={ingredient}/>}
		</div>
	);
}

export default IngredientItem;
