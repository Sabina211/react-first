import { FeedBoard } from '../../components/feed/feed-board/feed-board';
import { FeedList } from '../../components/feed/feed-list/feed-list';
import styles from './feed-page.module.css';
import { Orders } from '../../utils/types';
import { useEffect, useState } from 'react';

export const FeedPage = () => {
	const [orders, setOrders] = useState<Orders>([]);
	const [socket, setSocket] = useState<WebSocket | null>(null);

	useEffect(() => {
		const ws = new WebSocket('wss://norma.nomoreparties.space/orders/all');
		setSocket(ws);

		ws.onmessage = (event) => {
			const data = JSON.parse(event.data);
			if (data.success && Array.isArray(data.orders)) {
				setOrders(data.orders);
				console.log('Полученные заказы:', data.orders); // ← вот здесь!
			}
		};

		return () => {
			ws.close();
		};
	}, []);

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1 className={`${styles.title} text_type_main-large`}>
					Лента заказов
				</h1>
				<FeedList orders={orders} />
				<FeedBoard />
			</div>
		</main>
	);
};
