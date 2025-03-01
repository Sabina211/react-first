import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import React from 'react';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../ingredientsPropTypes';
import { useRef, useEffect, useState } from 'react';

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

	const containerRef = useRef(null); // Контейнер с ингредиентами
	const [activeTab, setActiveTab] = useState('bun');
	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;

			const containerTop = containerRef.current.getBoundingClientRect().top;
			const sections = Object.keys(headersRef).map((key) => {
				const section = headersRef[key].current;
				if (!section) return { key, offset: Infinity };

				return { key, offset: Math.abs(section.getBoundingClientRect().top - containerTop) };
			});

			// Находим ближайший к верху контейнера заголовок
			const nearest = sections.sort((a, b) => a.offset - b.offset)[0].key;

			// Обновляем активный таб
			setActiveTab(nearest);
		};

		const container = containerRef.current;
		if (container) {
			container.addEventListener('scroll', handleScroll);
		}

		// Убираем обработчик при размонтировании
		return () => {
			if (container) {
				container.removeEventListener('scroll', handleScroll);
			}
		};
	}, []);


	return (
		<section className={styles.ingredientsBlock}>
			<h1 className='text_type_main-large'>Соберите бургер</h1>
			<BurgerIngredientsTabs tabChange={tabChange}  activeTab={activeTab} />
			<div ref={containerRef}  className={`${styles.groupContainer} custom-scroll`}>
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
