import AppHeader from '../app-header/app-header';

import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
			<BrowserRouter>
				<AppHeader />
				<Routes>
					<Route path='/' element={<HomePage />} />
				</Routes>
				<Routes>
					<Route path='/login' element={<LoginPage />} />
				</Routes>
				<Routes>
					<Route path='/register' element={<RegisterPage />} />
				</Routes>
				<Routes>
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
				</Routes>
				<Routes>
					<Route path='/reset-password' element={<ResetPasswordPage />} />
				</Routes>
				<Routes>
					<Route path='/profile' element={<ProfilePage />} />
				</Routes>
				<Routes>
					<Route
						path='/1'
						element={
							<IngredientPage/>
						}
					/>
				</Routes>
				<Routes>
					<Route path='*' element={<ErrorPage />} />
				</Routes>
			</BrowserRouter>
		</DndProvider>
	);
}
export { App };
