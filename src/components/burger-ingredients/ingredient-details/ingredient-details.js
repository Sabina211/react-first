import styles from './ingredient-details.module.css';
import Modal from '../../modal/modal';

function IngredientDetails({ isOpen, onClose, ingredient }) {
	if (!isOpen) return null;

	return (
		<Modal isOpen={isOpen} onClose={onClose} header='Детали ингредиента'>
			<div className={`${styles.modalForm} ${styles.centerElement}`} >
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
		</Modal>
	);
}

export default IngredientDetails;
