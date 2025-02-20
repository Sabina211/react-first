import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { ingredientsPropTypes } from '../../../ingredientsPropTypes';

function IngredientItem({ ingredient }) {
	const [show, setShow] = useState(false);
	const count = Math.floor(Math.random() * 2);

	function showDetails() {
		setShow(true);
	}

	function hideDetails() {
		setShow(false);
	}
	return (
		<>
			<li className={styles.card} onClick={showDetails}>
				<div className={styles.imageWrapper}>
					<img src={ingredient.image} alt={ingredient.name} />
					{count && count > 0 ? (
						<Counter
							count={count}
							size='default'
							extraClass={`${styles.count} "m-1"`}
						/>
					) : undefined}
				</div>
				<div className={`${styles.cardText}`}>
					<span className='text text_type_digits-default mr-2'>
						{ingredient.price}
					</span>
					<CurrencyIcon type='primary' />
				</div>
				<div className={`${styles.cardText} text text_type_main-default`}>
					{ingredient.name}
				</div>
			</li>

			{show && (
				<Modal isOpen={show} onClose={hideDetails} header='Детали ингредиента'>
					<IngredientDetails ingredient={ingredient} />
				</Modal>
			)}
		</>
	);
}

IngredientItem.propTypes = {
	ingredient: ingredientsPropTypes.isRequired,
};

export default IngredientItem;
