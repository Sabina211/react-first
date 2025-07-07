import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Summary from '../summary/summary';
import { useDrag, useDrop } from 'react-dnd';
import { PlugElement } from '../plug-element/plug-element';
import { DraggableSortIngredient } from './draggable-sort-ingredient/draggable-sort-ingredient';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { v4 as uuidv4 } from 'uuid';
import { useCallback, useEffect } from 'react';
import {
	addBun,
	addIngredient,
	mainsOrderChanged,
	getTotalPrice,
	removeIngredient,
} from '../../services/reducers/burger-constructor';
import { Ingredient, IngredientWithUUID } from '../../utils/types';

const BurgerConstructor: React.FC = () => {
	const dispatch = useDispatch();
	const bun = useSelector(
		(state) => state.burgerConstructor.bun
	) as Ingredient | null;
	const mains = useSelector(
		(state) => state.burgerConstructor.mains
	) as IngredientWithUUID[];

	const totalPrice = useSelector((state) => state.burgerConstructor.totalPrice);

	const moveElement = useCallback(
		(draggedIndex: number, targetIndex: number) => {
			if (draggedIndex === targetIndex) return;
			const updatedMains = [...mains];
			const [draggedElement] = updatedMains.splice(draggedIndex, 1);
			updatedMains.splice(targetIndex, 0, draggedElement);
			dispatch(mainsOrderChanged(updatedMains));
		},
		[mains, dispatch]
	);

	type DragItem = {
		type: string;
		uuid?: string;
		index?: number;
		_id: string;
		name: string;
		price: number;
		image: string;
		[key: string]: any;
	};

	//перетягивание ингредиента в конструктор
	const [{ canDrop, itemType }, drop] = useDrop(() => ({
		accept: ['ingredientItem', 'sortedItem'],
		drop: (item: Ingredient) => {
			if (item.type === 'bun') {
				dispatch(addBun(item));
			} else if (item.type === 'sauce' || item.type === 'main') {
				const newItem: IngredientWithUUID = { ...item, uuid: uuidv4() };
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

	const removeIngridient = (ingredient: IngredientWithUUID) => {
		dispatch(removeIngredient(ingredient));
		dispatch(getTotalPrice());
	};

	const bunStyle: React.CSSProperties = { backgroundColor: '#2f2f37' };
	const mainsStyle: React.CSSProperties = { backgroundColor: '#2f2f37' };

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
				className={`${styles.constructorBlockContent} mt-25 ml-4`}>
				<div data-testid='bun-drop-target-top'>
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
				</div>
				<div data-testid='ingredient-drop-target'>
					{mains?.length > 0 ? (
						<div
							className={`${styles.constructorBlockContent} ${styles.mainsList}`}>
							{mains.map((element, index) => (
								<DraggableSortIngredient
									key={element.uuid}
									index={index}
									element={element}
									moveElement={moveElement}
									removeElement={removeIngridient}
								/>
							))}
						</div>
					) : (
						<PlugElement
							style={mainsStyle}
							text='Перетяните сюда начинки из списка справа'
							position='middle'></PlugElement>
					)}
				</div>
				<div data-testid='bun-drop-target-bottom'>
				{bun ? (
					<div
						className={styles.edgesElements}
						>
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
			</div>
			<Summary />
		</section>
	);
};

export default BurgerConstructor;
