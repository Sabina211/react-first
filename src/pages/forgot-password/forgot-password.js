import styles from './forgot-password.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';

export function ForgotPasswordPage() {
	const navigate = useNavigate();
	function onClick(){
		navigate('/reset-password');
	}
	return (
		<main className={styles.main}>
			<div className={styles.сontainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>Восстановление пароля</h1>
				<Input
					type={'text'}
					placeholder={'Укажите E-mail'}
					name={'name'}
					value=""
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
				/>
				<div className={styles.button}>
					<Button htmlType='button' type='primary' size='medium' onClick={onClick}>
					Восстановить
					</Button>
				</div>
				<div className={`${styles.textBlock} text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{' '}
					<a className={styles.linkText} href='/login'>Войти</a>
				</div>
			</div>
		</main>
	);
}
