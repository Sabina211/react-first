import styles from './register-page.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from '../../services/hooks/hooks';
import { useForm } from '../../hooks/useForm';
import { registerUser } from '../../services/reducers/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export function RegisterPage() {
	const [commonError, setCommonError] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);
	const [nameError, setNameError] = useState<string | null>(null);
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const { formValues, handleInputsChange } = useForm({
		name: '',
		email: '',
		password: '',
	});
	const location = useLocation();
	const navigate = useNavigate();
	const pathFrom = location.state?.from?.pathname || '/';

	const dispatch = useDispatch();

	const onSubmit = async (event: FormEvent<HTMLFormElement> ) => {
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
			if ('error' in res) setCommonError(res.payload as string);
			else{
				navigate(pathFrom, { replace: true });
			}
		} catch (error) {
			const err = error as Error;
			setCommonError(err.message || 'Ошибка при запросе');
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
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
					errorText={nameError ?? ""}
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
					errorText={emailError ?? ""}
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
					errorText={passwordError ?? ""}
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
					<Link className={styles.linkText} to='/login'>
						Войти
					</Link>
				</div>
			</form>
		</main>
	);
}
