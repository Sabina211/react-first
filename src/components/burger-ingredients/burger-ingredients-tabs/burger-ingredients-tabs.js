import styles from './burger-ingredients-tabs.module.css';

import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';

function BurgerIngredientsTabs({}) {
	return (
		<div className={styles.tabs}>
			<Tab>Булки</Tab>
			<Tab>Соусы</Tab>
			<Tab>Начинки</Tab>
		</div>
	);
}

export default BurgerIngredientsTabs;
