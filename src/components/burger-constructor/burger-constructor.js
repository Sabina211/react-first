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
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect } from 'react';
import {
	addBun,
	addIngredient,
	mainsOrderChanged,
	getTotalPrice,
} from '../../services/reducers/burger-constructor';

function BurgerConstructor() {
	const dispatch = useDispatch();
	const bun = useSelector((state) => state.constructor.bun);
	const mains = useSelector((state) => state.constructor.mains);

	const totalPrice = useSelector((state) => state.constructor.totalPrice);

	const moveElement = useCallback(
		(draggedIndex, targetIndex) => {
			if (draggedIndex === targetIndex) return;

			const updatedMains = [...mains].map((item) => ({ ...item }));
			const [draggedElement] = updatedMains.splice(draggedIndex, 1);
			updatedMains.splice(targetIndex, 0, draggedElement);
			console.log(`Перемещение ${draggedIndex} → ${targetIndex}`);
			console.log('старый');
			console.log(mains);
			console.log('новый');
			console.log(updatedMains);
			dispatch(mainsOrderChanged(updatedMains));
		},
		[mains, dispatch]
	);

	//перетягивание ингредиента в конструктор
	const [{ canDrop, itemType }, drop] = useDrop(() => ({
		accept: ['ingredientItem', 'sortedItem'],
		drop: (item) => {
			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else if (item.type === 'sauce' || item.type === 'main') {
				const newItem = { ...item, uuid: uuidv4() };
				dispatch(addIngredient(newItem));
			}
			dispatch(getTotalPrice());
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
								key={element.uuid + index}
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
			<Summary sum={totalPrice} />
		</section>
	);
}

/*BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};
*/
export default BurgerConstructor;
