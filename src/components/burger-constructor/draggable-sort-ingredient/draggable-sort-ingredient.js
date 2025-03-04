import PropTypes from 'prop-types';
import styles from '../burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
const ItemType = 'ITEM';

export function DraggableSortIngredient({ element, index, moveElement  }) {
	const ref = useRef(null);

	const [{ isDragging }, drag] = useDrag({
		type: ItemType, //ItemType просто строка, надо только чтобы она совпадала с accept в useDrop
		item: { index  },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: ItemType,
		hover(item, monitor) {
			console.log('Перетаскивание: ', item.index, ' -> ', index);
			//срабатывает, если наводить один элемент на другой
			if (!ref.current)
				return;
			const dragIndex = item.index; //тот, который тянем
			const hoverIndex = index; //тот, на который перетаскиванием

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const clientOffset = monitor.getClientOffset();
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (
				(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
				(dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
			) {
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

DraggableSortIngredient.propTypes = {
	element: PropTypes.object.isRequired,
	index: PropTypes.number.isRequired,
	moveElement: PropTypes.func.isRequired,
};
