import styles from './reset-password.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/reducers/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function ResetPasswordPage() {
	const [commonError, setCommonError] = useState(null);
	const [tokenError, setTokenError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const { formValues, handleInputsChange } = useForm({
		token: '',
		password: '',
	});
	const navigate = useNavigate();

	useEffect(() => {
		const hasAccess = localStorage.getItem('accessToResetPassword');
		if (!hasAccess) {
			navigate('/', { replace: true });
		}
	}, [navigate]);

	const dispatch = useDispatch();

	const onSubmit = async (event) => {
		event.preventDefault(); // предотвращаем перезагрузку страницы при отправке формы
		setCommonError(null);
		if (formValues.token === '' || formValues.password === '') {
			if (formValues.token === '')
				setTokenError('Необходимо заполнить поле Код');

			if (formValues.password === '')
				setPasswordError('Необходимо заполнить поле Пароль');

			return;
		}

		try {
			const res = await dispatch(resetPassword(formValues));
			if (res.error) setCommonError(res.payload);
		} catch (error) {
			setCommonError(error.message || 'Ошибка при запросе');
		}
	};

	const onChange = (e) => {
		handleInputsChange(e);
		if (formValues.token !== '') setTokenError(null);
		if (formValues.password !== '') setPasswordError(null);
	};

	return (
		<main className={styles.main}>
			<form onSubmit={onSubmit} className={styles.сontainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>
					Восстановление пароля
				</h1>
				<Input
					type={'password'}
					placeholder={'Введите новый пароль'}
					name={'password'}
					icon={'ShowIcon'}
					value={formValues.password}
					error={passwordError !== null}
					errorText={passwordError}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					onChange={onChange}
				/>
				<Input
					type={'text'}
					placeholder={'Введите код из письма'}
					name={'token'}
					value={formValues.token}
					error={tokenError !== null}
					errorText={tokenError}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					onChange={onChange}
				/>
				{commonError && <p className={styles.errorText}>{commonError}</p>}
				<div className={styles.button}>
					<Button htmlType='submit' type='primary' size='medium'>
						Сохранить
					</Button>
				</div>
				<div
					className={`${styles.textBlock} text text_type_main-default text_color_inactive`}>
					Вспомнили пароль?{' '}
					<a className={styles.linkText} href='/login'>
						Войти
					</a>
				</div>
			</form>
		</main>
	);
}
