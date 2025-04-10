import IngredientDetails from '../../components/burger-ingredients/ingredient-details/ingredient-details';
import styles from './ingredient-page.module.css';


export function IngredientPage() {
	return (
		<div className={styles.container}>
			<h1 className={`text text_type_main-large ${styles.header}`}>
				Детали ингредиента
			</h1>
			<IngredientDetails  />
		</div>
	);
}
