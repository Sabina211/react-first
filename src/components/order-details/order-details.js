import styles from './order-details.module.css';
import img from '../../images/done.png';
import PropTypes from 'prop-types';

function OrderDetails({ title, number }) {
	return (
		<div className={styles.modalForm}>
			<p
				className={`${styles.orderId} ${styles.centerElement} text text_type_digits-large`}>
				{number}
			</p>
			<p className={`${styles.centerElement} text text_type_main-medium`}>
				{title}
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

OrderDetails.propTypes = {
	title: PropTypes.string,
	number: PropTypes.number,
};

export default OrderDetails;
