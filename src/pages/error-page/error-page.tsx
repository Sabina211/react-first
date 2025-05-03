import styles from  './error-page.module.css';

export function ErrorPage() {

	return (
		<div className={styles.container}>
			<h1 className={`text text_type_main-large ${styles.header}`}>Страница не найдена</h1>
		</div>
	);
}
