import styles from './forgot-password.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { forgotPassword } from '../../services/reducers/user';
import { ChangeEvent, FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../store/store';

interface ForgotPasswordForm {
	email: string;
	[key: string]: string;
}

export const ForgotPasswordPage: React.FC = () => {
	const [commonError, setCommonError] = useState<string | null>(null);
	const [emailError, setEmailError] = useState<string | null>(null);
	const { formValues, handleInputsChange } = useForm<ForgotPasswordForm>({
		email: '',
	});
	const dispatch = useDispatch<AppDispatch>();

	const navigate = useNavigate();

	const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setCommonError(null);

		if (formValues.email === '') {
			setEmailError('Необходимо заполнить поле Email');
			return;
		}

		try {
			const res = await dispatch(forgotPassword(formValues)).unwrap();
			if (res.error) setCommonError(res.payload);
			navigate('/reset-password');
		} catch (error: any) {
			setCommonError(error.message || 'Ошибка при запросе');
		}
	};

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleInputsChange(e);
		if (formValues.email !== '') setEmailError(null);
	};

	return (
		<main className={styles.main}>
			<form onSubmit={onSubmit} className={styles.сontainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>
					Восстановление пароля
				</h1>
				<Input
					type={'email'}
					placeholder={'Укажите E-mail'}
					name={'email'}
					value={formValues.email}
					error={emailError !== null}
					errorText={emailError ?? ""}
					size={'default'}
					extraClass={`${styles.input} ml-1`}
					onChange={onChange}
				/>
				{commonError && <p className={styles.errorText}>{commonError}</p>}
				<div className={styles.button}>
					<Button htmlType='submit' type='primary' size='medium'>
					Восстановить
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
