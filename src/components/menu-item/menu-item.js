import styles from './menu-item.module.css';

function MenuItem({ icon: Icon, text, href, isActive }) {
	return (
		<button
			href={href}
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

export default MenuItem;
