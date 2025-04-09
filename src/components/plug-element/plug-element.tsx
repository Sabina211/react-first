import styles from './plug-element.module.css';
import { FC } from 'react';

interface IPlugElement{
	text: string;
	position: string;
	style: React.CSSProperties;
}

export const PlugElement: FC<IPlugElement> = ({text, position, style}) => {
	return (
		<div style={style} className={`text text_type_main-medium ${styles.plugElement} ${position ? styles[position] : ''}`}>
			{text}
		</div>
	);
}
