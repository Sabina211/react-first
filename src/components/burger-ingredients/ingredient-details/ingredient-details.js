import styles from './ingredient-details.module.css';
import { ingredientsPropTypes } from '../../../ingredientsPropTypes';

function IngredientDetails({ ingredient }) {
	return (
		<div className={`${styles.modalForm} ${styles.centerElement}`}>
			<div className={styles.content}>
				<img className={`${styles.img}`} src={ingredient.image}></img>
				<p className={`${styles.centerElement} text text_type_main-medium`}>
					{ingredient.name}
				</p>
				<div className={styles.compound}>
					<div className={styles['detail-item']}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Калории,ккал
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{ingredient.calories}
						</div>
					</div>
					<div className={styles['detail-item']}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Белки, г
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{ingredient.proteins}
						</div>
					</div>
					<div className={styles['detail-item']}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Жиры, г
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{ingredient.fat}
						</div>
					</div>
					<div className={styles['detail-item']}>
						<div className='text text_type_main-default text_color_inactive mb-2'>
							Углеводы, г
						</div>
						<div className='text-center text text_type_digits-default text_color_inactive'>
							{ingredient.carbohydrates}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = {
	ingredient: ingredientsPropTypes.isRequired,
};

export default IngredientDetails;
