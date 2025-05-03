import styles from '../burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag, useDrop } from 'react-dnd';
import { useRef } from 'react';
import { Ingredient, IngredientWithUUID } from '../../../ingredient';

interface DragItem {
	uuid: string;
	index: number;
	dragType: string;
}

interface DraggableSortIngredientProps {
	element: IngredientWithUUID;
	index: number;
	moveElement: (fromIndex: number, toIndex: number) => void;
	removeElement: (ingredient: IngredientWithUUID) => void;
}

export const DraggableSortIngredient: React.FC<
	DraggableSortIngredientProps
> = ({ element, index, moveElement, removeElement }) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [{ isDragging }, drag] = useDrag({
		type: 'sortedItem',
		item: { uuid: element.uuid, index, dragType: 'sortedItem' },
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	const [, drop] = useDrop<DragItem>({
		accept: 'sortedItem',
		hover(item, monitor) {
			if (!ref.current) return;

			const dragIndex = item.index;
			const hoverIndex = index;

			if (dragIndex === hoverIndex) return;

			const hoverBoundingRect = ref.current.getBoundingClientRect();
			const clientOffset = monitor.getClientOffset();
			if (!clientOffset) return; // Защита от ошибки

			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
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
			className={styles.draggableBlock}
			ref={ref}
			style={{
				opacity: isDragging ? 0 : 1,
			}}>
			<span className={styles.draggable}>
				<DragIcon type='primary' />
			</span>
			<ConstructorElement
				handleClose={() => removeElement(element)}
				text={element.name}
				price={element.price}
				thumbnail={element.image}
			/>
		</div>
	);
};
