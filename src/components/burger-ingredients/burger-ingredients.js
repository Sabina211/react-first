import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import React from 'react';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../ingredientsPropTypes';
import { useRef } from 'react';

function BurgerIngredients({ ingredients }) {
	function tabChange(value) {
		headersRef[value].current.scrollIntoView({ behavior: 'smooth' });
	}

	const groups = React.useMemo(() => {
		if (!Array.isArray(ingredients)) return { bun: [], sauce: [], main: [] };

		return {
			bun: ingredients.filter((i) => i.type === 'bun'),
			sauce: ingredients.filter((i) => i.type === 'sauce'),
			main: ingredients.filter((i) => i.type === 'main'),
		};
	}, [ingredients]);

	const headers = {
		bun: 'Булки',
		sauce: 'Соусы',
		main: 'Начинки',
	};

	const headersRef = {
		bun: useRef(null),
		sauce: useRef(null),
		main: useRef(null),
	};

	return (
		<section className={styles.ingredientsBlock}>
			<h1 className='text_type_main-large'>Соберите бургер</h1>
			<BurgerIngredientsTabs tabChange={tabChange} />
			<div className={`${styles.groupContainer} custom-scroll`}>
				{Object.keys(groups).map((key) => (
					<IngredientsGroup
						headersRef={headersRef}
						headers={headers}
						groups={groups}
						key={key}
						itemKey={key}
					/>
				))}
			</div>
		</section>
	);
}
BurgerIngredients.propTypes = {
	ingredients: PropTypes.arrayOf(ingredientsPropTypes.isRequired).isRequired,
};

export default BurgerIngredients;
