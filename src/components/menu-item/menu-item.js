import { bool } from 'prop-types';
import styles from './menu-item.module.css';
import PropTypes from 'prop-types';

function MenuItem({ icon: Icon, text, isActive }) {
	return (
		<button
			className={`${styles.button} text text_type_main-default ml-2`}
			type='button'>
			<Icon type={isActive ? 'primary' : 'secondary'} />
			<span
				className={`text text_type_main-default ml-2 ${
					isActive ? 'text_color_primary' : 'text_color_inactive'
				}`}>
				{text}
			</span>
		</button>
	);
}

MenuItem.propTypes =  {
	icon: PropTypes.elementType.isRequired,
	text: PropTypes.string.isRequired,
	isActive:  PropTypes.bool,
};


export default MenuItem;
