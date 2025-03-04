import AppHeader from '../app-header/app-header';
import styles from './app.module.scss';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import burgerIngredientsStyles from '../burger-ingredients/burger-ingredients.module.css';
import { getIngredients, getIngredients2 } from '../../services/actions/ingredients';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

function App() {
	const dispatch = useDispatch();
	const { ingredients, isLoading, isFailed } = useSelector(
		(store) => store.ingredients
	);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	return (
		<DndProvider backend={HTML5Backend}>
			<BrowserRouter>
				{ingredients.length > 0 && !isLoading ? (
					<div className={styles.page}>
						<AppHeader />
						<main className={burgerIngredientsStyles.main}>
							<div className={burgerIngredientsStyles.container}>
								<BurgerIngredients ingredients={ingredients} />
								<BurgerConstructor ingredients={ingredients}/>
							</div>
						</main>
					</div>
				) : isFailed ? (
					<p>Что-то упало, напишите в техподдержку</p>
				) : (
					<p>Загрузка</p>
				)}
			</BrowserRouter>
		</DndProvider>
	);
}
export { App };
