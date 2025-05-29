import styles from './feed-board.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

export const FeedBoard = () => {
	const { orders, total, totalToday } = useSelector((state: RootState) => state.webSocket);

  return (
    <div className={styles.container}>
      <div className={styles.board}>
        <div className={styles.status}>
          <span className='text text_type_main-medium'>Готовы:</span>
          <ul className={styles.list}>
            {orders
              .filter((order) => order.status === 'done')
              .map((order) => (
                <li key={order._id} className={`${styles.done} text text_type_digits-default`}>{`0${order.number}`}</li>
              ))}
          </ul>
        </div>
        <div className={styles.status}>
          <span className='text text_type_main-medium'>В работе:</span>
          <ul className={styles.list}>
            {orders
              .filter((order) => order.status === 'pending')
              .map((order) => (
                <li key={order._id} className='text text_type_digits-default'>{`0${order.number}`}</li>
              ))}
          </ul>
        </div>
      </div>
      <div className={styles['all-time']}>
        <span className='text text_type_main-medium'>Выполнено за все время:</span>
        <span className={`${styles.total} text text_type_digits-large`}>{total}</span>
      </div>
      <div className={styles.today}>
        <span className='text text_type_main-medium'>Выполнено за сегодня:</span>
        <span className={`${styles.total} text text_type_digits-large`}>{totalToday}</span>
      </div>
    </div>
  );
}