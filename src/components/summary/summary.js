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

function Summary() {
	const dispatch = useDispatch();
	const [show, setShow] = useState(false);
	var selectedBun = useSelector((state) => state.constructor.bun);
	var selectedMains = useSelector((state) => state.constructor.mains);
	var totalPrice = useSelector((state) => state.constructor.totalPrice);
	var ingredientsIds = selectedMains?.map((x) => x._id);
	var orderState = useSelector((state) => state.order);

	async function showOrder() {
		if (!selectedBun) {
			alert('Нужно выбрать булку для бургера');
			return;
		}

		if (selectedMains?.filter((x) => x.type === 'main').length <= 0) {
			alert('Нужно выбрать начинку для бургера');
			return;
		}
		await dispatch(postOrder([...ingredientsIds, selectedBun._id]));
	}

	useEffect(() => {
		if (!orderState.isLoading && orderState.order != null) {
			console.log(orderState);
			setShow(true);
		}
	}, [orderState]);

	function hideOrder() {
		setShow(false);
		cleanConstructorAfterOrder();
	}

	function cleanConstructorAfterOrder() {
		dispatch(cleanConstructor());
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
			{show && (
				<Modal isOpen={show} onClose={hideOrder}>
					<OrderDetails
						title={orderState.order.name}
						number={orderState.order.order.number}
					/>
				</Modal>
			)}
		</div>
	);
}

export default Summary;
