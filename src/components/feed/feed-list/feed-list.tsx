import styles from './feed-list.module.css';
import React from "react";
import { Orders } from "../../../utils/types";

interface FeedListProps {
	orders: Orders;
  }

  export const FeedList: React.FC<FeedListProps> = ({ orders }) => {
	if (!orders || orders.length === 0) {
	  return <div>Нет заказов</div>;
	}

	return (
	  <ul>
		{orders.map(order => (
		  <li key={order._id || order.number}>
			Заказ #{order.number} — статус: {order.status}
		  </li>
		))}
	  </ul>
	);
  };
