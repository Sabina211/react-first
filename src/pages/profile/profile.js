import styles from './profile.module.css';
import {
	Input,
	Button,
} from '@ya.praktikum/react-developer-burger-ui-components';
import ProfileLink from './profile-link/profile-link'

export function ProfilePage() {
	return (
		<main className={styles.main}>
			<div className={styles.container}>
				<div className={styles.rightContainer}>
				<ProfileLink
                        path='/profile'
                        text="Профиль"
                    />
                    <ProfileLink
                        path='/profile/orders'
                        text="История заказов"
                    />
                    <ProfileLink
                        path='/login'
                        text="Выход"

                    />
                    <p className={`${styles.text} text text_type_main-default text_color_inactive`}>
                        В этом разделе вы можете
                        <br />
                        изменить свои персональные данные
                    </p>
				</div>
				<div className={styles.centerContainer}>
					<Input
						type={'text'}
						placeholder={'Имя'}
						//onChange={(e) => setValue(e.target.value)}
						value=''
						name={'name'}
						error={false}
						icon={'EditIcon'}
						//ref={inputRef}
						//onIconClick={onIconClick}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={`${styles.input} ml-1`}
					/>
					<Input
						type={'text'}
						placeholder={'Логин'}
						icon={'EditIcon'}
						name={'name'}
						value=''
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={`${styles.input} ml-1`}
					/>
						<Input
						type={'text'}
						placeholder={'Пароль'}
						icon={'EditIcon'}
						name={'name'}
						value=''
						error={false}
						errorText={'Ошибка'}
						size={'default'}
						extraClass={`${styles.input} ml-1`}
					/>
				</div>
			</div>
		</main>
	);
}
