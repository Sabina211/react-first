import styles from './ingredient-details.module.css';
import { useParams } from 'react-router-dom';
import { ErrorPage } from '../../../pages/error-page/error-page';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getIngredients } from '../../../services/actions/ingredients';

function IngredientDetails() {
	const { id } = useParams();
	const dispatch = useDispatch();
	const { ingredients, isLoading, isFailed } = useSelector(
		(store) => store.ingredients
	);
	const [ingredient, setIngredient] = useState(null);
	useEffect(() => {
		if (!ingredients.length) {
			dispatch(getIngredients());
		} else {
			const foundIngredient = ingredients.find((item) => item._id === id);
			setIngredient(foundIngredient);
		}
	}, [dispatch, ingredients, id]);

	if (isFailed || (!isLoading && !ingredient && ingredients.length > 0)) {
		return <ErrorPage />;
	}

	if (isLoading || !ingredient) {
		return <p>Загрузка...</p>;
	}

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

export default IngredientDetails;
