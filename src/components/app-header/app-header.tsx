import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';
import { Link, NavLink, useLocation } from 'react-router-dom';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import {  useSelector } from '../../services/hooks/hooks';

const AppHeader = () => {
	const user = useSelector((state) => state.user.user);
	const location = useLocation();
	const currentPath = location.pathname;

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.menu_items}>
					<Link to='/'>
						<MenuItem
							icon={BurgerIcon}
							isActive={currentPath === '/'}
							text='Конструктор'
						/>
					</Link>
					<Link to='/feed'>
						<MenuItem
							isActive={currentPath.startsWith('/orders')}
							icon={ListIcon}
							text='Лента заказов'
						/>
					</Link>
				</div>
				<Link to='/' className={styles.logo}>
					<Logo />
				</Link>
				<div className={styles.auth_button}>
					<NavLink to='/profile'>
						<MenuItem
							isActive={currentPath.startsWith('/profile')}
							icon={ProfileIcon}
							text={!user?.name ? 'Личный кабинет' : user.name}
						/>
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
