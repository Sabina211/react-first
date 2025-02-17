import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../ingredientsPropTypes';
import Summary from '../summary/summary';
import { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';

const ItemType = 'ITEM';

function BurgerConstructor({ ingredients }) {
	const bun = ingredients.find((item) => item.type === 'bun');
	const [mains, setMains] = useState(
		ingredients.filter((item) => item.type !== 'bun')
	);

	const moveElement = (draggedIndex, targetIndex) => {
		const updatedMains = [...mains];
		const [draggedElement] = updatedMains.splice(draggedIndex, 1); // Убираем перетаскиваемый элемент
		updatedMains.splice(targetIndex, 0, draggedElement); // Вставляем его в новую позицию
		setMains(updatedMains);
	};

	return (
		<section className={styles.constructorBlock}>
			<div
				style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
				className='mt-25 ml-4'>
				<div className={styles.edgesElements}>
					<ConstructorElement
						type='top'
						isLocked={true}
						text={bun.name}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
				<div
					style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
					className={styles.mainsList}>
					{mains.map((element, index) => {
						//перетаскивание элеметов
						const [{ isDragging }, drag] = useDrag({
							type: ItemType,
							item: { index },
							collect: (monitor) => ({
								isDragging: monitor.isDragging(),
							}),
						});

						const [, drop] = useDrop({
							accept: ItemType,
							drop: (item) => {
								if (item.index !== index) {
									moveElement(item.index, index);
								}
							},
						});

						return (
							<div
								ref={(node) => drag(drop(node))}
								key={element._id}
								style={{
									opacity: isDragging ? 0.5 : 1,
									cursor: 'move',
								}}>
								<span className={styles.draggable}>
									<DragIcon type='primary' />
								</span>
								<ConstructorElement
									text={element.name}
									price={element.price}
									thumbnail={element.image}
									key={element._id}
								/>
							</div>
						);
					})}
				</div>
				<div className={styles.edgesElements}>
					<ConstructorElement
						type='bottom'
						isLocked={true}
						text={bun.name}
						price={bun.price}
						thumbnail={bun.image}
					/>
				</div>
			</div>
			<Summary sum='4561'/>
		</section>
	);
}

BurgerConstructor.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};

export default BurgerConstructor;
