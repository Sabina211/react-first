import styles from './register-page.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';

export function RegisterPage() {
	//const { formValues, handleInputsChange } = useForm({ name: "", email: "", password: "", });

    const dispatch = useDispatch();
	return (
		<main className={styles.main}>
			<div className={styles.сontainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>Регистрация</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					//value={formValues.name}
					name={'name'}
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					//onChange = {handleInputsChange}
				/>
				<Input
					type={'text'}
					placeholder={'E-mail'}
					name={'name'}
					value=""
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
				/>
				<Input
					type={'text'}
					placeholder={'Пароль'}
					icon={'ShowIcon'}
					name={'name'}
					value=""
					error={false}
					errorText={'Ошибка'}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
				/>
				<div className={styles.button}>
					<Button htmlType='button' type='primary' size='medium'>
					Зарегистрироваться
					</Button>
				</div>
				<div className={`${styles.textBlock} text text_type_main-default text_color_inactive`}>
					Уже зарегистрированы?{' '}
					<a className={styles.linkText} href='/login'>Войти</a>
				</div>
			</div>
		</main>
	);
}
