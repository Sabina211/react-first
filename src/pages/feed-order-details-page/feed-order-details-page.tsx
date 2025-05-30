import styles from './feed-order-details-page.module.css';
import FeedOrderDetails from '../../components/feed/feed-order-details/feed-order-details';

export default function FeedOrderDetailsPage() {
  return (
    <main className={styles.main}>
      <FeedOrderDetails />
    </main>
  );
}
