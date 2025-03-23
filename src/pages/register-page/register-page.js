import styles from './register-page.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { registerUser } from '../../services/reducers/user';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function RegisterPage() {
	const [commonError, setCommonError] = useState(null);
	const [emailError, setEmailError] = useState(null);
	const [nameError, setNameError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const { formValues, handleInputsChange } = useForm({
		name: '',
		email: '',
		password: '',
	});
	const location = useLocation();
	const navigate = useNavigate();
	const pathFrom = location.state?.from?.pathname || '/';

	const dispatch = useDispatch();

	const onSubmit = async (event) => {
		event.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы
		setCommonError(null);
		if (formValues.email === '' || formValues.password === '' || formValues.name === '') {
			if (formValues.email === '')
				setEmailError('Необходимо заполнить поле Email');

			if (formValues.password === '')
				setPasswordError('Необходимо заполнить поле Пароль');

			if (formValues.name === '')
				setNameError('Необходимо заполнить поле Имя');

			return;
		}

		try {
			const res = await dispatch(registerUser(formValues));
			if (res.error) setCommonError(res.payload);
			else{
				navigate(pathFrom, { replace: true });
			}
		} catch (error) {
			setCommonError(error.message || 'Ошибка при запросе');
		}
	};

	const onChange = (e) => {
		handleInputsChange(e);
		if (formValues.email !== '') setEmailError(null);
		if (formValues.password !== '') setPasswordError(null);
		if (formValues.name !== '') setNameError(null);
	};
	return (
		<main className={styles.main}>
			<form onSubmit={onSubmit} className={styles.сontainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>
					Регистрация
				</h1>
				<Input
					type={'text'}
					placeholder={'Имя'}
					value={formValues.name}
					name={'name'}
					error={nameError !== null}
					errorText={nameError}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					onChange={onChange}
				/>
				<Input
					type={'email'}
					placeholder={'E-mail'}
					name={'email'}
					value={formValues.email}
					error={emailError !== null}
					errorText={emailError}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					onChange={onChange}
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
						Зарегистрироваться
					</Button>
				</div>
				<div
					className={`${styles.textBlock} text text_type_main-default text_color_inactive`}>
					Уже зарегистрированы?{' '}
					<a className={styles.linkText} href='/login'>
						Войти
					</a>
				</div>
			</form>
		</main>
	);
}
