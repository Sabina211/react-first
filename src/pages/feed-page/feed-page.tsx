import { FeedBoard } from '../../components/feed/feed-board/feed-board';
import { FeedList } from '../../components/feed/feed-list/feed-list';
import styles from './feed-page.module.css';
import { Orders } from '../../utils/types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { connect, disconnect } from '../../services/reducers/websocket';
import { RootState } from '../../store/store';

export const FeedPage = () => {
	const dispatch = useDispatch();
	const orders = useSelector((state: RootState) => state.webSocket.orders);

	useEffect(() => {
		dispatch(connect(''));
		return () => {
			dispatch(disconnect());
		};
	}, [dispatch]);

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
