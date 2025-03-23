import {
	Button,
	CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './summary.module.css';
import OrderDetails from '../order-details/order-details';
import Modal from '../modal/modal';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { postOrder } from '../../services/reducers/order';
import { cleanConstructor } from '../../services/reducers/burger-constructor';
import { useNavigate, useLocation } from 'react-router-dom';

function Summary() {
	const dispatch = useDispatch();
	//const [show, setShow] = useState(false);
	var selectedBun = useSelector((state) => state.burgerConstructor.bun);
	var selectedMains = useSelector((state) => state.burgerConstructor.mains);
	var totalPrice = useSelector((state) => state.burgerConstructor.totalPrice);
	var ingredientsIds = selectedMains?.map((x) => x._id);
	var orderState = useSelector((state) => state.order);
	const location = useLocation();
	const navigate = useNavigate();

	async function showOrder() {
		if (!selectedBun) {
			alert('Нужно выбрать булку для бургера');
			return;
		}

		if (selectedMains?.filter((x) => x.type === 'main').length <= 0) {
			alert('Нужно выбрать начинку для бургера');
			return;
		}
		navigate('/order', { state: { background: location } });
		await dispatch(postOrder([...ingredientsIds, selectedBun._id]));
		console.log("навигация");

	}

	return (
		<div className={styles.summary}>
			<div className='text text_type_digits-medium mr-2 mb-1'>{totalPrice}</div>
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

		</div>
	);
}

export default Summary;
