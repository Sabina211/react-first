import BurgerIngredientsTabs from './burger-ingredients-tabs/burger-ingredients-tabs';
import React from 'react';
import IngredientsGroup from './ingredients-group/ingredients-group';
import styles from './burger-ingredients.module.css';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Ingredient, IngredientType } from '../../utils/types';

const BurgerIngredients= ()=>  {
	const { ingredients } = useSelector(
		(store: RootState) => store.ingredients
	);
	const headersRef: Record<IngredientType, React.RefObject<HTMLHeadingElement>> = {
		bun: useRef<HTMLHeadingElement>(null),
		sauce: useRef<HTMLHeadingElement>(null),
		main: useRef<HTMLHeadingElement>(null),
	};

	function tabChange(value: IngredientType){
		const ref = headersRef[value].current;
		if(ref)
		{
			ref.scrollIntoView({ behavior: 'smooth' });
		}
	}

	const groups = React.useMemo(() => {
		if (!Array.isArray(ingredients)) return { bun: [], sauce: [], main: [] };

		return {
			bun: ingredients.filter((i: Ingredient) => i.type === 'bun'),
			sauce: ingredients.filter((i: Ingredient)  => i.type === 'sauce'),
			main: ingredients.filter((i: Ingredient)  => i.type === 'main'),
		};
	}, [ingredients]);

	const headers: Record<IngredientType, string> = {
		bun: 'Булки',
		sauce: 'Соусы',
		main: 'Начинки',
	};


	const containerRef = useRef<HTMLDivElement | null>(null); // Контейнер с ингредиентами
	const [activeTab, setActiveTab] = useState('bun');
	useEffect(() => {
		const handleScroll = () => {
			if (!containerRef.current) return;

			const containerTop = containerRef.current.getBoundingClientRect().top;
			const sections = (Object.keys(headersRef) as IngredientType[]).map((key) => {
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

export default BurgerIngredients;
