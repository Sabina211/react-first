import styles from './profile-orders-history.module.css';
import { useEffect } from 'react';
import { useSelector, useDispatch } from '../../../services/hooks/hooks';
import { FeedList } from '../../../components/feed/feed-list/feed-list';
import { connect, disconnect } from '../../../services/reducers/websocket';
import { WebsocketStatus } from '../../../utils/types';

export function ProfileOrdersHistory() {
	const dispatch = useDispatch();
	const { status, orders } = useSelector((state) => state.webSocket);
	const user = useSelector((state) => state.user.user);
	useEffect(() => {
		const token = localStorage.getItem('accessToken');
		console.log(user);
		if (token) {
			const wsUrl = `/orders?token=${token.substring(7)}`;
			console.log("Connecting to:", wsUrl);
			dispatch(connect(wsUrl));
		}
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
