import AppHeader from '../app-header/app-header';
import styles from './app.module.scss';
import BurgerIngredients from '../burger-ingredients/burger-ingredients';
import burgerIngredientsStyles from '../burger-ingredients/burger-ingredients.module.css';
import { ingredientsData } from '../../utils/data';
import BurgerConstructor from '../burger-constructor/burger-constructor';
import { BrowserRouter } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export const App = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<BrowserRouter>
				<div className={styles.page}>
					<AppHeader />
					<main className={burgerIngredientsStyles.main}>
						<div className={burgerIngredientsStyles.container}>
							<BurgerIngredients ingredients={ingredientsData} />
							<BurgerConstructor ingredients={ingredientsData} />
						</div>
					</main>
				</div>
			</BrowserRouter>
		</DndProvider>
	);
};
