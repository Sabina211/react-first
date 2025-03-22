import AppHeader from '../app-header/app-header';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Routes, Route, useLocation } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { HomePage } from '../../pages/home-page/home-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { ErrorPage } from '../../pages/error-page/error-page';
import Modal from '../modal/modal';
import IngredientDetails from '../burger-ingredients/ingredient-details/ingredient-details';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {ProfileUserPage} from '../../pages/profile/profile-user/profile-user';
import {ProfileOrdersHistory} from '../../pages/profile/profile-orders-history/profile-orders-history';

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	return (
		<DndProvider backend={HTML5Backend}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password' element={<ResetPasswordPage />} />
				<Route path='/profile' element={<ProfilePage />} />

				<Route path='/profile' element={<ProfilePage />}>
					<Route index element={<ProfileUserPage />} />
					<Route path='orders-history' element={<ProfileOrdersHistory />} />
				</Route>

				<Route path='/ingredients/:id' element={<IngredientPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>

			{background && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal
								isOpen={true}
								onClose={() => navigate('/')}
								header='Детали ингредиента'>
								<IngredientDetails />
							</Modal>
						}
					/>
				</Routes>
			)}
		</DndProvider>
	);
}
export { App };
