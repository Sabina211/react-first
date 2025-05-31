import styles from './profile-orders-history.module.css';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '../../../store/store';
import { useSelector, useDispatch } from 'react-redux';
import { FeedList } from '../../../components/feed/feed-list/feed-list';
import { connect, disconnect } from '../../../services/reducers/websocket';
import { WebsocketStatus } from '../../../utils/types';

export function ProfileOrdersHistory() {
	const dispatch = useDispatch();
	const { status, orders } = useSelector((state: RootState) => state.webSocket);
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		if (token) {
			const wsUrl = `/orders?token=${token.substring(7)}`;
			console.log("Connecting to:", wsUrl);
			dispatch(connect(wsUrl));
		}
		if (orders) console.log('123');
		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

	useEffect(() => {
		console.log("Websocket status:", status, "Orders:", orders);
	}, [status, orders]);

	return (
		<div className={styles.orders}>
			{status === WebsocketStatus.ONLINE && orders.length > 0 && (
				<FeedList
					isShowStatus={false}
					endpoint='/profile/orders'
					isOrdersReverse={true}
				/>
			)}
		</div>
	);
}
