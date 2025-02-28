import AppHeader from '../app-header/app-header';
import styles from './app.module.scss';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import burgerIngredientsStyles from '../burger-ingredients/burger-ingredients.module.css';
import { getIngredientsRequest } from '../../utils/api-data';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useEffect, useState } from 'react';

function App() {

	const [result, setResult] = useState({
		ingredients: null,
		isLoading: true,
		isError: false,
	});

	useEffect(() => {
		getIngredientsRequest()
			.then((data) => {
				setResult({ ingredients: data, isLoading: false, isError: false });
			})
			.catch(() => {
				setResult({ ingredients: null, isLoading: false, isError: true });
			});
	}, []);

	return (
		<DndProvider backend={HTML5Backend}>
			<BrowserRouter>
				{result.ingredients ? (
					<div className={styles.page}>
						<AppHeader />
						<main className={burgerIngredientsStyles.main}>
							<div className={burgerIngredientsStyles.container}>
								<BurgerIngredients ingredients={result.ingredients} />
								<BurgerConstructor ingredients={result.ingredients} />
							</div>
						</main>
					</div>
				) : (
					<p>Что-то упало, напишите в техподдержку</p>
				)}
			</BrowserRouter>
		</DndProvider>
	);
}
export { App };
