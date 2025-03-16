import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BurgerIngredients from '../../components/burger-ingredients/burger-ingredients';
import burgerIngredientsStyles from '../../components/burger-ingredients/burger-ingredients.module.css';
import { getIngredients } from '../../services/actions/ingredients';
import BurgerConstructor from '../../components/burger-constructor/burger-constructor';

export function HomePage() {
	const dispatch = useDispatch();
	const { ingredients, isLoading, isFailed } = useSelector(
		(store) => store.ingredients
	);

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);
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
