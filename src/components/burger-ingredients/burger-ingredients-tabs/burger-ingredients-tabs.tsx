import styles from './burger-ingredients-tabs.module.css';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC } from 'react';
import { IngredientType } from '../../../ingredient';

interface IBurgerIngredientsTabsProps {
	tabChange: (type: IngredientType) => void;
	activeTab: string;
}

const BurgerIngredientsTabs: FC<IBurgerIngredientsTabsProps> = ({ tabChange, activeTab })=>{
	function change(type: IngredientType) {
		tabChange(type);
	}
	return (
		<div className={styles.tabs}>
			<Tab value={'bun'} active={activeTab === 'bun'} onClick={change}>
				Булки
			</Tab>
			<Tab value={'sauce'} active={activeTab === 'sauce'} onClick={change}>
				Соусы
			</Tab>
			<Tab value={'main'} active={activeTab === 'main'} onClick={change}>
				Начинки
			</Tab>
		</div>
	);
}

export default BurgerIngredientsTabs;
