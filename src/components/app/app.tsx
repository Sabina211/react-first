import { clsx } from 'clsx';
import { useState } from 'react';
import s from './app.module.scss';
import reactLogo from './assets/react.svg';
import { ReactComponent as TypescriptLogo } from './assets/typescript.svg';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import AppHeader from '../app-header/app-header';
import styles from './app.module.scss';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import burgerIngredientsStyles from '../burger-ingredients/burger-ingredients.module.css';
import { ingredientsData } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';

export const App = () => {
	return (
		<div className={styles.page}>
			<AppHeader />
			<main className={burgerIngredientsStyles.main}>
				<div className={burgerIngredientsStyles.container}>
					<BurgerIngredients ingredients={ingredientsData} />
					<BurgerConstructor ingredients={ingredientsData} />
				</div>
			</main>
		</div>
	);
};
