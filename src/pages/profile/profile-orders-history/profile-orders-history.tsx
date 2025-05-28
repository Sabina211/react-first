import styles from '../profile.module.css';
import { useEffect } from "react";
import { AppDispatch } from '../../../store/store';
import { useSelector, useDispatch } from 'react-redux';

export function ProfileOrdersHistory() {
	const dispatch: AppDispatch = useDispatch();

	return (
		<form>
			<div className={styles.centerContainer}>
				<p>Раздел в разработке</p>
			</div>
		</form>
	);
}
