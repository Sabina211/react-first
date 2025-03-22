import styles from './profile.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileLink from './profile-link/profile-link';
import { useDispatch, useSelector } from 'react-redux';
import { logout, getUser, login, postUser } from '../../services/reducers/user';
import { useEffect, useState } from 'react';
import { useForm } from '../../hooks/useForm';

export function ProfilePage() {
	const dispatch = useDispatch();
	const [showButtons, setShowButtons] = useState(false);
	const user = useSelector((state) => state.user.user);
	const [commonError, setCommonError] = useState(null);
	const [successText, setSuccessText] = useState(null);
	const { formValues, handleInputsChange, setFormValues } = useForm({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (!user || !user.name) {
			/*dispatch(login({
				"email": "Iamsabina12@gmail.com",
				"password": "password123"
				}
				));*/
			dispatch(getUser());
		}
	}, [dispatch]);

	useEffect(() => {
		if (user && user.name) {
			setFormValues({
				name: user.name || '',
				email: user.email || '',
				password: '',
			});
		}
	}, [user]);

	const logOut = () => {
		dispatch(logout());
	};

	const onChange = (e) => {
		handleInputsChange(e);
		setShowButtons(true);
		setSuccessText(null);
	};

	const cancelInput = () => {
		setFormValues({
			name: user.name,
			email: user.email,
			password: '',
		});
		setShowButtons(false);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		setCommonError(null);
		setSuccessText(null);
		try {
			const res = await dispatch(postUser(formValues));
			if (res.error) setCommonError(res.payload);
			else setSuccessText("Данные обновлены");
		} catch (error) {
			setCommonError(error.message || 'Ошибка при запросе');
		}
	};

	return (
		<main className={styles.main}>
			<form onSubmit={onSubmit} className={styles.container}>
				<div className={styles.rightContainer}>
					<ProfileLink path='/profile' text='Профиль' />
					<ProfileLink path='/profile/orders' text='История заказов' />
					<ProfileLink path='/login' text='Выход' onClick={logOut} />
					<p
						className={`${styles.text} text text_type_main-default text_color_inactive`}>
						В этом разделе вы можете
						<br />
						изменить свои персональные данные
					</p>
				</div>
				<div className={styles.centerContainer}>
					<Input
						type={'text'}
						placeholder={'Имя'}
						onChange={onChange}
						value={formValues.name}
						name={'name'}
						error={false}
						icon={'EditIcon'}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={`${styles.input} ml-1`}
					/>
					<Input
						type={'text'}
						placeholder={'Логин'}
						icon={'EditIcon'}
						onChange={onChange}
						value={formValues.email}
						name={'email'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={`${styles.input} ml-1`}
					/>
					<Input
						type={'password'}
						placeholder={'Пароль'}
						icon={'EditIcon'}
						onChange={onChange}
						value={formValues.password}
						name={'password'}
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={`${styles.input} ml-1`}
					/>
					{successText && <p className={styles.successText}>{successText}</p>}
					{commonError && <p className={styles.errorText}>{commonError}</p>}
					{showButtons && (
						<div className={styles.button}>
							<Button
								onClick={cancelInput}
								htmlType='submit'
								type='secondary'
								size='medium'>
								Отменить
							</Button>
							<Button htmlType='submit' type='primary' size='medium'>
								Сохранить
							</Button>
						</div>
					)}
				</div>
			</form>
		</main>
	);
}
