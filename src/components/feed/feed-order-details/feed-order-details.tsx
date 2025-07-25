import styles from './feed-order-details.module.css';
import { useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Order, Statuses } from '../../../utils/types';
import { useDispatch, useSelector } from '../../../services/hooks/hooks';
import { getUniqIngredientsWithAmount } from '../../../utils/functions';
import {
	getOrder,
	updateOrder,
	clearOrder,
} from '../../../services/reducers/order';

export default function FeedOrderDetails() {
	const { id } = useParams<{ id: string }>();
	const { ingredients } = useSelector((state) => state.ingredients);
	const {
		isLoading: orderLoading,
		error,
		getOrder: order,
	} = useSelector((store) => store.order);
	const orders = useSelector((state) => state.order.getOrder);
	const dispatch = useDispatch();
	const location = useLocation();

	useEffect(() => {
		if (!order || order.number.toString() !== id) {
			dispatch(getOrder(id!));
		}
		return () => {
			dispatch(clearOrder());
		};
	}, [dispatch, id]);

	const orderIngredients =
		order && getUniqIngredientsWithAmount(order.ingredients, ingredients);
	return (
		<div className={styles.order}>
			{error && <h2>Ошибка при загрузке заказа</h2>}
			{!location.state && !orderLoading && !error && !order && (
				<h2>{`Заказ #0${id} не найден`}</h2>
			)}
			{order && (
				<>
					<h2
						className={
							'text text_type_digits-default'
						}>{`#0${order.number}`}</h2>
					<span className='text text_type_main-medium mt-10'>{order.name}</span>
					<span
						className={`${styles.status} text text_type_main-default mt-3 ${
							order.status === 'done' ? styles.done : ''
						}`}>
						{Statuses[order.status]}
					</span>
					<span className='text text_type_main-medium mt-15 text text_type_main-default'>
						Состав:
					</span>
					<ul className={`${styles.ingredients} mt-6`}>
						{orderIngredients?.map((ingredient) => (
							<li key={ingredient._id} className={styles.ingredient}>
								<div className={styles['preview-container']}>
									<img
										src={ingredient.image_mobile}
										alt={ingredient.name}
										className={styles.preview}
									/>
								</div>
								<span className='text text_type_main-small'>
									{ingredient.name}
								</span>
								<div className={`${styles.price} ${styles.amount}`}>
									<span className='text text_type_digits-default'>{`${ingredient.amount} x ${ingredient.price}`}</span>
									<CurrencyIcon type='primary' />
								</div>
							</li>
						))}
					</ul>
					<div className={`${styles.total} mt-10`}>
						<FormattedDate
							className='text text_type_main-default text_color_inactive'
							date={new Date(order.createdAt)}
						/>
						<div className={styles.price}>
							<span className='text text_type_digits-default'>
								{orderIngredients?.reduce(
									(acc, ingredient) =>
										(acc += ingredient.price * ingredient.amount),
									0
								)}
							</span>
							<CurrencyIcon type='primary' />
						</div>
					</div>
				</>
			)}
		</div>
	);
}
