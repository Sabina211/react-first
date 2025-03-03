import styles from './plug-element.module.css';
export function PlugElement({text, position, style}) {
	return (
		<div style={style} className={`text text_type_main-medium ${styles.plugElement} ${position ? styles[position] : ''}`}>
			{text}
		</div>
	);
}
