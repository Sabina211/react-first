import styles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';

function IngredientsGroup({ groups, itemKey, headers, headersRef }) {


	return (
		<div  key={itemKey}>
			<h2 ref={headersRef[itemKey]}>{headers[itemKey]}</h2>
			<ul className={styles.container}>
				{groups[itemKey] &&
					groups[itemKey].map(
						(
							item // Проверяем, что groups[key] не undefined
						) => (
							<IngredientItem
								title={item.name}
								price={item.price}
								img={item.image}
								key={item._id}
							/>
						)
					)}
			</ul>
		</div>
	);
}

export default IngredientsGroup;
