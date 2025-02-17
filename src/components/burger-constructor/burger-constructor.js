import styles from './burger-constructor.module.css';
import {
	ConstructorElement,
	DragIcon,
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerConstructor({ ingredients }) {
	const bun = ingredients.find((item) => item.type === 'bun');
	const mains = ingredients.filter((item) => item.type !== 'bun');
	console.log(bun);
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
					{mains.map((element) => (
						<div key={element._id + 'dragIcon'}>
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
					))}
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
			<div className={styles.summary}>
				<div className='text text_type_digits-medium mr-2 mb-1'>45623</div>
				<div className={`${styles['total-icon']} mr-10`}>
					<CurrencyIcon type='primary' />
				</div>
				<Button htmlType='button' type='primary' size='medium'>
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

export default BurgerConstructor;
