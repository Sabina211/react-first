import styles from '../profile.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import {
	getUser,
	login,
	postUser,
} from '../../../services/reducers/user';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useForm } from '../../../hooks/useForm';
import { AppDispatch, RootState } from '../../../store/store';

export function ProfileUserPage() {
	const dispatch = useDispatch<AppDispatch>();
	const [showButtons, setShowButtons] = useState<boolean>(false);
	const user = useSelector((state: RootState) => state.user.user);
	const [commonError, setCommonError] = useState<string | null>(null);
	const [successText, setSuccessText] = useState<string | null>(null);
	const { formValues, handleInputsChange, setFormValues } = useForm({
		name: '',
		email: '',
		password: '',
	});

	useEffect(() => {
		if (!user || !user.name) {
			dispatch(login({
				"email": "Iamsabina12@gmail.com",
				"password": "123"
				}
				));
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

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		handleInputsChange(e);
		setShowButtons(true);
		setSuccessText(null);
	};

	const cancelInput = () => {
		setFormValues({
			name: user?.name || '',
			email: user?.email || '',
			password: '',
		});
		setShowButtons(false);
	};

	const onSubmit = async (event: FormEvent<HTMLFormElement> ) => {
		event.preventDefault();
		setCommonError(null);
		setSuccessText(null);
		try {
			const res = await dispatch(postUser(formValues));
			if ('error' in res)
				setCommonError(res.payload as string);
			else setSuccessText('Данные обновлены');
		} catch (error) {
			const err = error as Error;
			setCommonError(err.message || 'Ошибка при запросе');
		}
	};

	return (
		<form onSubmit={onSubmit}>
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
	);
}
