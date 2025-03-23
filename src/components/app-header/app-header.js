import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import React from 'react';
import styles from './app-header.module.css';
import MenuItem from '../menu-item/menu-item';
import itemStyles from '../menu-item/menu-item.module.css';
import { Link, NavLink } from 'react-router-dom';
import {
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';

const AppHeader = () => {
	const user = useSelector((state) => state.user.user);
	//const auth = false;
	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<div className={styles.menu_items}>
					<Link to='/'>
						<MenuItem icon={BurgerIcon} isActive text='Конструктор' />
					</Link>
					<Link to='/orders'>
						<MenuItem icon={ListIcon} text='Лента заказов' />
					</Link>
				</div>
				<div className={styles.logo}>
					<Logo />
				</div>
				<div className={styles.auth_button}>
					<NavLink to='/profile'>
						<MenuItem
							icon={ProfileIcon}
							text={!user.name ? 'Личный кабинет' : user.name}
						/>
					</NavLink>
				</div>
			</div>
		</header>
	);
};

export default AppHeader;
