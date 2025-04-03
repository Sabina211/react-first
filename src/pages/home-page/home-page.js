import { useSelector, useDispatch } from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import burgerIngredientsStyles from '../../components/burger-ingredients/burger-ingredients.module.css';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export function HomePage() {
	const { ingredients, isLoading, isFailed } = useSelector(
		(store) => store.ingredients
	);

	return (
		<>
			{ingredients.length > 0 && !isLoading ? (
				<div>
					<main className={burgerIngredientsStyles.main}>
						<div className={burgerIngredientsStyles.container}>
							<BurgerIngredients />
							<BurgerConstructor />
						</div>
					</main>
				</div>
			) : isFailed ? (
				<p>Что-то упало, напишите в техподдержку</p>
			) : (
				<p>Загрузка</p>
			)}
		</>
	)
}
