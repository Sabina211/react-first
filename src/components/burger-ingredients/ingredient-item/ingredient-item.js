import {
	CurrencyIcon,
	Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-item.module.css';
import { useState } from 'react';
import IngredientDetails from '../ingredient-details/ingredient-details';
import Modal from '../../modal/modal';
import { ingredientsPropTypes } from '../../../ingredientsPropTypes';
import { useDrag } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import React from 'react';
function IngredientItem({ ingredient }) {
	const mains = useSelector((state) => state.constructor.mains);
	const bun = useSelector((state) => state.constructor.bun);
	const [show, setShow] = useState(false);

	const count = React.useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0;
		}
		return mains?.find((item) => item._id === ingredient._id)?.count || 0;
	}, [ingredient, bun, mains]);

	function showDetails() {
		setShow(true);
	}

	function hideDetails() {
		setShow(false);
	}

	const [{ isDragging }, drag] = useDrag(() => ({
		type: 'ingredientItem',
		item: ingredient,
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
			handlerId: monitor.getHandlerId(),
		}),
	}));
	const opacity = isDragging ? 0.4 : 1;

	return (
		<>
			<li className={styles.card} onClick={showDetails}>
				<div className={styles.imageWrapper}>
					<img
						src={ingredient.image}
						alt={ingredient.name}
						ref={drag}
						style={{ cursor: 'move', opacity }}
					/>
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
