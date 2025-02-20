import styles from './order-details.module.css';
import img from '../../images/done.png';

function OrderDetails() {
	return (
		<div className={styles.modalForm}>
			<p
				className={`${styles.orderId} ${styles.centerElement} text text_type_digits-large`}>
				034536
			</p>
			<p className={`${styles.centerElement} text text_type_main-medium`}>
				идентификатор заказа
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
