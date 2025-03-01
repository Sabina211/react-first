import styles from './burger-ingredients-tabs.module.css';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerIngredientsTabs({ tabChange, activeTab }) {
	function change(type) {
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

BurgerIngredientsTabs.propTypes = {
	tabChange: PropTypes.func.isRequired,
	activeTab: PropTypes.string.isRequired,
};

export default BurgerIngredientsTabs;
