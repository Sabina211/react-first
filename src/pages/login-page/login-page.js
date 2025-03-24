import styles from './login-page.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { login } from '../../services/reducers/user';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function LoginPage() {
	const [commonError, setCommonError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const { formValues, handleInputsChange } = useForm({
		email: '',
		password: '',
	});
	const location = useLocation();
	const navigate = useNavigate();
	const pathFrom =
		location.state?.from?.pathname === '/order'
			? '/'
			: location.state?.from?.pathname || '/';

	const dispatch = useDispatch();

	const onSubmit = async (event) => {
		event.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы
		setCommonError(null);
		if (formValues.email === '' || formValues.password === '') {
			if (formValues.email === '')
				setEmailError('Необходимо заполнить поле Email');

			if (formValues.password === '')
				setPasswordError('Необходимо заполнить поле Пароль');

			return;
		}

		try {
			const res = await dispatch(login(formValues));
			if (res.error) setCommonError(res.payload);
			else navigate(pathFrom, { replace: true });
		} catch (error) {
			setCommonError(error.message || 'Ошибка при логине');
		}
	};

	const onChange = (e) => {
		handleInputsChange(e);
		if (formValues.email !== '') setEmailError(null);
		if (formValues.password !== '') setPasswordError(null);
	};

	return (
		<main className={styles.main}>
			<form onSubmit={onSubmit} className={styles.loginContainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>Вход</h1>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					onChange={onChange}
					value={formValues.email}
					name={'email'}
					error={emailError !== null}
					errorText={emailError}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
				/>
				<Input
					type={'password'}
					placeholder={'Пароль'}
					icon={'ShowIcon'}
					name={'password'}
					value={formValues.password}
					error={passwordError !== null}
					errorText={passwordError}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					onChange={onChange}
				/>
				{commonError && <p className={styles.errorText}>{commonError}</p>}
				<div className={styles.button}>
					<Button htmlType='submit' type='primary' size='medium'>
						Войти
					</Button>
				</div>
				<div
					className={`${styles.textBlock} text text_type_main-default text_color_inactive`}>
					Вы новый пользователь?{' '}
					<Link className={styles.linkText} to='/register'>
						Зарегистрироваться
					</Link>
				</div>
				<div className='text text_type_main-default text_color_inactive'>
					Забыли пароль?{' '}
					<Link className={styles.linkText} to='/forgot-password'>
						Восстановить пароль
					</Link>
				</div>
			</form>
		</main>
	);
}
