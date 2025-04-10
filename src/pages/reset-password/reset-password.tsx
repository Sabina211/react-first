import styles from './reset-password.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { resetPassword } from '../../services/reducers/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';

export function ResetPasswordPage() {
	const [commonError, setCommonError] = useState<string | null>(null);
	const [tokenError, setTokenError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
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

	const dispatch = useDispatch<AppDispatch>();

	const onSubmit = async (event: FormEvent<HTMLFormElement> ) => {
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
			if ('error' in res) setCommonError(res.payload as string);
		} catch (error) {
			const err = error as Error;
			setCommonError(err.message || 'Ошибка при запросе');
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
					errorText={passwordError ?? ''}
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
					errorText={tokenError ?? ''}
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
					<Link className={styles.linkText} to='/login'>
						Войти
					</Link>
				</div>
			</form>
		</main>
	);
}
