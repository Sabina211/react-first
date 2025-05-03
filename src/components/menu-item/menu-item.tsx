import { FC } from 'react';
import styles from './menu-item.module.css';

type MenuItemProps = {
	icon: React.ElementType;
	text: string;
	isActive?: boolean;
};

const MenuItem: FC<MenuItemProps> = ({ icon: Icon, text, isActive = false }) => {
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
};

export default MenuItem;
