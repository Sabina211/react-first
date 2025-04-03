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
import { Link, useLocation } from 'react-router-dom';
import React from 'react';

function IngredientItem({ ingredient }) {
	const location = useLocation();
	const mains = useSelector((state) => state.burgerConstructor.mains);
	const bun = useSelector((state) => state.burgerConstructor.bun);

	const count = React.useMemo(() => {
		if (ingredient.type === 'bun') {
			return bun?._id === ingredient._id ? 2 : 0;
		}
		return mains?.find((item) => item._id === ingredient._id)?.count || 0;
	}, [ingredient, bun, mains]);

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
			<Link
				to={`/ingredients/${ingredient._id}`}
				state={{ background: location }}
				className={styles.text}>
				<li className={styles.card}>
					<div className={styles.imageWrapper}>
						<img
							src={ingredient.image}
							alt={ingredient.name}
							ref={drag}
							style={{ opacity }}
							className={styles.draggableBlock}
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
			</Link>
		</>
	);
}

IngredientItem.propTypes = {
	ingredient: ingredientsPropTypes.isRequired,
};

export default IngredientItem;
