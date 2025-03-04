import PropTypes from 'prop-types';
import styles from '../burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { useRef, useEffect, useCallback } from 'react';

export function DraggableSortIngredient({ element, index, moveElement  }) {
	const ref = useRef(null);
	console.log(element.uuid, index)

	const [{ isDragging }, drag] = useDrag({
		type:  'sortedItem',
		item: { uuid: element.uuid, index, dragType: 'sortedItem' },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop({
		accept: 'sortedItem',
		hover(item, monitor) {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return; // Защита от ошибки

			const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (
				(dragIndex < hoverIndex && hoverClientY < hoverMiddleY) ||
				(dragIndex > hoverIndex && hoverClientY > hoverMiddleY)
			) {
				return;
			}
			moveElement(dragIndex, hoverIndex);
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
