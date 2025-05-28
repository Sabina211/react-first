import { FeedBoard } from './feed-board/feed-board';
import { FeedList } from './feed-list/feed-list';
import styles from './feed.module.css';
import { useEffect, useState } from 'react';
import { IOrder } from '../../services/reducers/order';

export const Feed = () => {

	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<h1 className={`${styles.title} text_type_main-large`}>
					Лента заказов
				</h1>

				<FeedBoard/>
			</div>
		</main>
	);
};
