import styles from './order-details.module.css';
import img from '../../images/done.png';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store/store';
import type { OrderState } from '../../services/reducers/order';


const OrderDetails: React.FC = () => {
	const orderState = useSelector<RootState, OrderState>((state) => state.order);

	useEffect(() => {
		if (!orderState.isLoading && orderState.order != null) {
			console.log(orderState);
		}
	}, [orderState]);



	return (
		<div className={styles.modalForm}>
			{orderState.isLoading ? (
				<h1 className={styles.loader}>Загрузка...</h1>
			) : (
				<div>
					{' '}
					<p
						className={`${styles.orderId} ${styles.centerElement} text text_type_digits-large`}>
						{orderState.order?.order.number}
					</p>
					<p className={`${styles.centerElement} text text_type_main-medium`}>
						{orderState.order?.order.name}
					</p>
					<img className={`${styles.img}`} src={img}></img>
					<p className={` ${styles.centerElement} text text_type_main-default`}>
						Ваш заказ начали готовить
					</p>
					<p
						className={`${styles.bottomText} ${styles.centerElement} text text_type_main-default  text_color_inactive`}>
						Дождитесь готовности на орбитальной станции
					</p>
				</div>
			)}
		</div>
	);
}

export default OrderDetails;
