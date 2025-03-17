import AppHeader from '../app-header/app-header';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import {  Routes, Route } from 'react-router-dom';
import { LoginPage } from '../../pages/login-page/login-page';
import { HomePage } from '../../pages/home-page/home-page';
import { RegisterPage } from '../../pages/register-page/register-page';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { ProfilePage } from '../../pages/profile/profile';
import { IngredientPage } from '../../pages/ingredient-page/ingredient-page';
import { ErrorPage } from '../../pages/error-page/error-page';

function App() {
	return (
		<DndProvider backend={HTML5Backend}>
			<AppHeader />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				<Route path='/reset-password' element={<ResetPasswordPage />} />
				<Route path='/profile' element={<ProfilePage />} />
				<Route path='/1' element={<IngredientPage />} />
				<Route path='*' element={<ErrorPage />} />
			</Routes>
		</DndProvider>
	);
}
export { App };
