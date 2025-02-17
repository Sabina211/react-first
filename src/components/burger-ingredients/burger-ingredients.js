import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import React from 'react';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';

function BurgerIngredients({ ingredients }) {
	const groups = React.useMemo(() => {
		if (!Array.isArray(ingredients)) return { bun: [], sauce: [], main: [] };

		return {
			bun: ingredients.filter((i) => i.type === 'bun'),
			sauce: ingredients.filter((i) => i.type === 'sauce'),
			main: ingredients.filter((i) => i.type === 'main'),
		};
	}, [ingredients]);

	return (
		<section className={styles.ingredientsBlock}>
			<h1 className='text_type_main-large'>Соберите бургер</h1>
			<BurgerIngredientsTabs tabChange={() => {}} />{' '}
			{/* Временно отключаем tabChange */}
			<div className={`${styles.groupContainer} custom-scroll`}>
				{Object.keys(groups).map((key) => (
					<IngredientsGroup groups={groups} key={key} itemKey={key} />
				))}
			</div>
		</section>
	);
}

export default BurgerIngredients;
