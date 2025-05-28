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
import { useNavigate } from 'react-router-dom';
import { ProfileUserPage } from '../../pages/profile/profile-user/profile-user';
import { ProfileOrdersHistory } from '../../pages/profile/profile-orders-history/profile-orders-history';
import { ElementForAuthorized } from '../element-for-authorized/element-for-authorized';
import OrderDetails from '../order-details/order-details';
import { useSelector, useDispatch } from 'react-redux';
import { cleanConstructor } from '../../services/reducers/burger-constructor';
import { ElementForUnauthorized } from '../element-for-unauthorized/element-for-unauthorized';
import { getIngredients } from '../../services/actions/ingredients';
import { useEffect } from 'react';
import { RootState, AppDispatch } from '../../store/store';
import { FeedPage } from '../../pages/feed-page/feed-page';

const App: React.FC = () => {
	const location = useLocation();
	const dispatch: AppDispatch = useDispatch();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	function hideOrder() {
		navigate(-1);
		cleanConstructorAfterOrder();
	}

	function cleanConstructorAfterOrder() {
		dispatch(cleanConstructor());
	}
	return (
		<DndProvider backend={HTML5Backend}>
			<AppHeader />
			<Routes location={background || location}>
				<Route path='/' element={<HomePage />} />
				<Route path='/feed' element={<FeedPage />} />
				<Route
					path='/login'
					element={<ElementForUnauthorized element={<LoginPage />} />}
				/>
				<Route
					path='/register'
					element={<ElementForUnauthorized element={<RegisterPage />} />}
				/>
				<Route
					path='/forgot-password'
					element={<ElementForUnauthorized element={<ForgotPasswordPage />} />}
				/>
				<Route
					path='/reset-password'
					element={<ElementForUnauthorized element={<ResetPasswordPage />} />}
				/>
				<Route path='/profile' element={<ProfilePage />} />

				<Route
					path='/profile'
					element={<ElementForAuthorized element={<ProfilePage />} />}>
					<Route index element={<ProfileUserPage />} />
					<Route path='orders-history' element={<ProfileOrdersHistory />} />
				</Route>

				<Route path='/ingredients/:id' element={<IngredientPage />} />
				<Route
					element={
						<ElementForAuthorized
							path='/order'
							element={
								<Modal isOpen={true} onClose={hideOrder}>
									<OrderDetails />
								</Modal>
							}
						/>
					}
				/>
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
					<Route
						path='/order'
						element={
							<ElementForAuthorized
								element={
									<Modal isOpen={true} onClose={hideOrder}>
										<OrderDetails />
									</Modal>
								}
							/>
						}
					/>
				</Routes>
			)}
		</DndProvider>
	);
}
export { App };
