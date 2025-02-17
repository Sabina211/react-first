import styles from './menu-item.module.css';

function MenuItem({ icon: Icon, text }) {
	return (
		<button
			className={`${styles.button} text text_type_main-default ml-2`}
			type='button'>
			<Icon type='primary' />
			{text}
		</button>
	);
}

export default MenuItem;
