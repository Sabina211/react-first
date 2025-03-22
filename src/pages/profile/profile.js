import styles from './profile.module.css';
import ProfileLink from './profile-link/profile-link';
import { logout } from '../../services/reducers/user';
import { Outlet } from 'react-router-dom';

export function ProfilePage() {
	const logOut = () => {
		dispatch(logout());
	};

	return (
		<main className={styles.main}>
		<div className={styles.container}>
			<div className={styles.rightContainer}>
				<ProfileLink path='/profile' text='Профиль' />
				<ProfileLink path='/profile/orders-history' text='История заказов' />
				<ProfileLink path='/' text='Выход' onClick={logOut} />
				<p
					className={`${styles.text} text text_type_main-default text_color_inactive`}>
					В этом разделе вы можете
					<br />
					изменить свои персональные данные
				</p>
			</div>
			<Outlet />
		</div>
	</main>
	);
}
