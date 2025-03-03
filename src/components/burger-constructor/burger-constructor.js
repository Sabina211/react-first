import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../ingredientsPropTypes';
import Summary from '../summary/summary';
import { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { PlugElement } from '../plug-element/plug-element';
import { DraggableSortIngredient } from './draggable-sort-ingredient/draggable-sort-ingredient';
import { useDispatch, useSelector } from 'react-redux';
import {
	addBun,
	addIngredient,
	mainsOrderChanged,
} from '../../services/reducers/burger-constructor';

function BurgerConstructor({ ingredients }) {
	const dispatch = useDispatch();
	const bun = useSelector((state) => state.constructor.bun);
	const mains = useSelector((state) => state.constructor.mains);

	const moveElement = (draggedIndex, targetIndex) => {
		if (draggedIndex === targetIndex) return; // Исключаем ненужные обновления
		const updatedMains = [...mains];
		const [draggedElement] = updatedMains.splice(draggedIndex, 1);
		updatedMains.splice(targetIndex, 0, draggedElement);
		dispatch(mainsOrderChanged(updatedMains));
	};

	//перетягивание ингредиента в конструктор
	const [{ canDrop, itemType }, drop] = useDrop(() => ({
		accept: 'ingredientItem',
		drop: (item) => {
			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else {
				dispatch(addIngredient(item));
			}
			return { name: 'Burger Constructor' };
		},
		collect: (monitor) => ({
			canDrop: monitor.canDrop(),
			itemType: monitor.getItem()?.type,
		}),
	}));

	const bunStyle = { backgroundColor: '#2f2f37' };
	const mainsStyle = { backgroundColor: '#2f2f37' };

	if (canDrop && itemType === 'bun') {
		bunStyle.backgroundColor = '#4c4c73';
		bunStyle.borderStyle = 'dashed solid';
	} else if (canDrop) {
		mainsStyle.backgroundColor = '#4c4c73';
		mainsStyle.borderStyle = 'dashed solid';
	}

	return (
		<section className={styles.constructorBlock}>
			<div
				ref={drop}
				style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
				className='mt-25 ml-4'>
				{bun ? (
					<div className={styles.edgesElements}>
						<ConstructorElement
							type='top'
							isLocked={true}
							text={`${bun.name} (верх)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				) : (
					<PlugElement
						style={bunStyle}
						text='Перетяните сюда булку из списка справа'
						position='top'></PlugElement>
				)}

				{mains?.length > 0 ? (
					<div
						style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
						className={styles.mainsList}>
						{mains.map((element, index) => (
							<DraggableSortIngredient
								key={element._id}
								index={index}
								element={element}
								moveElement={moveElement}
							/>
						))}
					</div>
				) : (
					<PlugElement
						style={mainsStyle}
						text='Перетяните сюда начинки из списка справа'
						position='middle'></PlugElement>
				)}
				{bun ? (
					<div className={styles.edgesElements}>
						<ConstructorElement
							type='bottom'
							isLocked={true}
							text={`${bun.name} (низ)`}
							price={bun.price}
							thumbnail={bun.image}
						/>
					</div>
				) : (
					<PlugElement
						style={bunStyle}
						text='Перетяните сюда булку из списка справа'
						position='bottom'></PlugElement>
				)}
			</div>
			<Summary sum='4561' />
		</section>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
