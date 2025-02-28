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

const ItemType = 'ITEM';

function BurgerConstructor({ ingredients }) {
	const bun = ingredients.find((item) => item.type === 'bun');
	const [mains, setMains] = useState(
		ingredients.filter((item) => item.type !== 'bun')
	);

	const moveElement = (draggedIndex, targetIndex) => {
		if (draggedIndex === targetIndex) return; // Исключаем ненужные обновления
		const updatedMains = [...mains];
		const [draggedElement] = updatedMains.splice(draggedIndex, 1);
		updatedMains.splice(targetIndex, 0, draggedElement);
		setMains(updatedMains);
	};

	return (
		<section className={styles.constructorBlock}>
			<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='mt-25 ml-4'>
				<div className={styles.edgesElements}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={`${bun.name} (верх)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className={styles.mainsList}>
					{mains.map((element, index) => (
						<DraggableIngredient
							key={element._id}
							index={index}
							element={element}
							moveElement={moveElement}
						/>
					))}
				</div>
				<div className={styles.edgesElements}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={`${bun.name} (низ)`}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			</div>
			<Summary sum='4561' />
		</section>
	);
}

function DraggableIngredient({ element, index, moveElement }) {
	const ref = useRef(null);

	const [{ isDragging }, drag] = useDrag({
		type: ItemType,
		item: { index },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ItemType,
		hover(item, monitor) {
			if (!ref.current) return;
			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if ((dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
				(dragIndex > hoverIndex && hoverClientY > hoverMiddleY)) {
				return;
			}

			moveElement(dragIndex, hoverIndex);
			item.index = hoverIndex;
		},
	});

	drag(drop(ref));

	return (
		<div
			ref={ref}
			style={{
				opacity: isDragging ? 0 : 1,
				cursor: 'move',
			}}>
			<span className={styles.draggable}>
				<DragIcon type='primary' />
			</span>
			<ConstructorElement
				text={element.name}
				price={element.price}
				thumbnail={element.image}
			/>
		</div>
	);
}

DraggableIngredient.propTypes = {
	element: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	moveElement: PropTypes.func.isRequired,
};

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
