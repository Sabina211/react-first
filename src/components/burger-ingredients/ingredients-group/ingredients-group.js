import styles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import PropTypes from 'prop-types';
import { ingredientsPropTypes } from '../../../ingredientsPropTypes';

function IngredientsGroup({ groups, itemKey, headers, headersRef }) {
	return (
		<div>
			<h2 ref={headersRef[itemKey]}>{headers[itemKey]}</h2>
			<ul className={styles.container}>
				{groups[itemKey] &&
					groups[itemKey].map((item) => (
						<IngredientItem ingredient={item} key={item._id} />
					))}
			</ul>
		</div>
	);
}

IngredientsGroup.propTypes  = {
	groups: PropTypes.objectOf(PropTypes.arrayOf(ingredientsPropTypes))
		.isRequired,
	itemKey: PropTypes.string.isRequired,
	headers: PropTypes.objectOf(PropTypes.string).isRequired,
	headersRef: PropTypes.objectOf(
		PropTypes.shape({ current: PropTypes.instanceOf(Element) })
	).isRequired,
};

export default IngredientsGroup;
