import styles from './login-page.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';

export function LoginPage() {
	//const [value, setValue] = React.useState('value');
	//const inputRef = React.useRef(null);
	/*const onIconClick = () => {
		setTimeout(() => inputRef.current.focus(), 0);
		alert('Icon Click Callback');
	};*/
	return (
		<main className={styles.main}>
			<div className={styles.loginContainer}>
				<h1 className={`text text_type_main-medium ${styles.header}`}>Вход</h1>
				<Input
					type={'text'}
					placeholder={'E-mail'}
					//onChange={(e) => setValue(e.target.value)}
					value=""
					name={'name'}
					error={false}
					//ref={inputRef}
					//onIconClick={onIconClick}
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
						Войти
					</Button>
				</div>
				<div className={`${styles.textBlock} text text_type_main-default text_color_inactive`}>
					Вы новый пользователь?{' '}
					<a className={styles.linkText} href='/register'>Зарегистрироваться</a>
				</div>
				<div className='text text_type_main-default text_color_inactive'>
					Забыли пароль?{' '}
					<a className={styles.linkText} href='/forgot-password'>Восстановить пароль</a>
				</div>
			</div>
		</main>
	);
}
