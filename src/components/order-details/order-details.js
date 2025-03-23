import styles from './order-details.module.css';
import img from '../../images/done.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


export function OrderDetails() {
	var orderState = useSelector((state) => state.order);
	useEffect(() => {
		if (!orderState.isLoading && orderState.order != null) {
			console.log(orderState);
		}
	}, [orderState]);

	return (
		<div className={styles.modalForm}>
			<p
				className={`${styles.orderId} ${styles.centerElement} text text_type_digits-large`}>
				{orderState.order.order.number}
			</p>
			<p className={`${styles.centerElement} text text_type_main-medium`}>
			{orderState.order.name}
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
	);
}

export default OrderDetails;
