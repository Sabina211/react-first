import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './summary.module.css';
import { useState } from 'react';
import OrderInfo from '../order-info/order-info';

function Summary({ sum }) {
	const [show, setShow] = useState(false);

	function showOrder() {
		setShow(true);
	}

	function hideOrder() {
		setShow(false);
	}

	return (
		<div className={styles.summary}>
			<div className='text text_type_digits-medium mr-2 mb-1'>{sum}</div>
			<div className={`${styles.totalIcon} mr-10`}>
				<CurrencyIcon type='primary' />
			</div>
			<Button
				onClick={showOrder}
				htmlType='button'
				type='primary'
				size='medium'>
				Оформить заказ
			</Button>
			{show && <OrderInfo isOpen={show}/>}
		</div>
	);
}

export default Summary;
