import styles from './ingredients-group.module.css';
import IngredientItem from '../ingredient-item/ingredient-item';
import { Ingredient } from '../../../ingredient';
import { RefObject, FC } from 'react';

interface IngredientsGroupProps {
	groups: Record<string, Ingredient[]>;
	itemKey: string;
	headers: Record<string, string>;
	headersRef: Record<string, RefObject<HTMLHeadingElement>>;
}

const IngredientsGroup: FC<IngredientsGroupProps> = ({
	groups,
	itemKey,
	headers,
	headersRef,
}) => {
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
};

export default IngredientsGroup;
