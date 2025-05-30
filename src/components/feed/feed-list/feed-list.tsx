import styles from './feed-list.module.css';
import React from 'react';
import { Orders } from '../../../utils/types';
import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect } from '../../../services/reducers/websocket';
import { RootState } from '../../../store/store';
import { Link, useLocation } from 'react-router-dom';
import {
	CurrencyIcon,
	FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getUniqIngredientsWithAmount } from '../../../utils/functions';
import { Statuses } from '../../../utils/types';

interface FeedListProps {
	isShowStatus: boolean;
	endpoint: string;
	isOrdersReverse?: boolean;
}

export const FeedList: React.FC<FeedListProps> = ({
	isShowStatus,
	endpoint,
	isOrdersReverse = false,
}) => {
	const orders = useSelector((state: RootState) => state.webSocket.orders);
	const { error, ingredients } = useSelector(
		(state: RootState) => state.ingredients
	);
	const location = useLocation();

	const checkedOrders = isOrdersReverse ? [...orders].reverse() : orders;

	return (
		<ul className={styles.list}>
			{error && <>Ошибка при загрузке ингредиентов</>}
			{ingredients &&
				checkedOrders.map((order) => {
					const uniqIngredients = getUniqIngredientsWithAmount(
						order.ingredients,
						ingredients
					);
					return (
						<Link
							className={styles.link}
							key={order._id}
							to={`${endpoint}/${order.number}`}
							state={{ background: location }}>
							<li className={styles.card}>
								<div className={styles.id}>
									<span className='text text_type_digits-default'>{`#0${order.number}`}</span>
									<FormattedDate
										className='text text_type_main-default text_color_inactive'
										date={new Date(order.createdAt)}
									/>
								</div>
								<div className={styles.info}>
									<span className='text text_type_main-medium'>
										{order.name}
									</span>
									{isShowStatus &&
										(order.status === 'done' ? (
											<span className={styles.done}>{Statuses['done']}</span>
										) : (
											<span>{Statuses[order.status]}</span>
										))}
								</div>
								<div className={styles.components}>
									<ul className={styles.ingredients}>
										{(() => {
											const bun = uniqIngredients.find((i) => i.type === 'bun');
											const fillings = uniqIngredients.filter(
												(i) => i.type !== 'bun'
											);
											const displayedFillings = fillings.slice(0, 5);
											const extraCount =
												fillings.length > 5 ? fillings.length - 5 : 0;
											const itemsToDisplay = [
												...(bun ? [bun] : []),
												...displayedFillings,
											];

											return itemsToDisplay.map((ingredient, i) => (
												<li
													key={i}
													className={styles.ingredient}
													style={{
														transform: `translate(${-16 * i}px)`,
														zIndex: `${100 - i}`,
													}}>
													<img
														src={ingredient?.image_mobile}
														alt={ingredient?.name}
														className={styles.preview}
													/>
													{i === itemsToDisplay.length - 1 &&
														extraCount > 0 && (
															<span className={styles['preview-amount']}>
																+{extraCount}
															</span>
														)}
												</li>
											));
										})()}
									</ul>
									<div className={styles.price}>
										<span className='text text_type_digits-default'>
											{uniqIngredients.reduce(
												(acc, ingredient) =>
													acc + ingredient.price * ingredient.amount,
												0
											)}
										</span>
										<CurrencyIcon type='primary' />
									</div>
								</div>
							</li>
						</Link>
					);
				})}
		</ul>
	);
};
