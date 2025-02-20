import styles from './burger-ingredients-tabs.module.css';
import { useState } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

function BurgerIngredientsTabs({ tabChange }) {
	const [tab, setTab] = useState('bun');

	function change(type) {
		setTab(type);
		tabChange(type);
	}
	return (
		<div className={styles.tabs}>
			<Tab value={'bun'} active={tab === 'bun'} onClick={change}>
				Булки
			</Tab>
			<Tab value={'sauce'} active={tab === 'sauce'} onClick={change}>
				Соусы
			</Tab>
			<Tab value={'main'} active={tab === 'main'} onClick={change}>
				Начинки
			</Tab>
		</div>
	);
}

BurgerIngredientsTabs.propTypes = {
	tabChange: PropTypes.func.isRequired,
};

export default BurgerIngredientsTabs;
