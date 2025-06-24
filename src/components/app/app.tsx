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
import OrderDetails from '../order-details/order-details';
import { cleanConstructor } from '../../services/reducers/burger-constructor';
import { getIngredients } from '../../services/actions/ingredients';
import { useEffect } from 'react';
import { FeedPage } from '../../pages/feed-page/feed-page';
import FeedOrderDetailsPage from '../../pages/feed-order-details-page/feed-order-details-page';
import FeedOrderDetails from '../feed/feed-order-details/feed-order-details';
import ProtectedRouteElement from '../protected-route/protected-route';
import { checkUserAuth } from '../../services/reducers/user';
import {useDispatch} from '../../services/hooks/hooks';

const App: React.FC = () => {
	const location = useLocation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const background = location.state && location.state.background;
	useEffect(() => {
		dispatch(checkUserAuth());
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
					element={
						<ProtectedRouteElement onlyUnAuth={true} element={<LoginPage />} />
					}
				/>
				<Route
					path='/register'
					element={
						<ProtectedRouteElement
							onlyUnAuth={true}
							element={<RegisterPage />}
						/>
					}
				/>
				<Route
					path='/forgot-password'
					element={
						<ProtectedRouteElement
							onlyUnAuth={true}
							element={<ForgotPasswordPage />}
						/>
					}
				/>
				<Route
					path='/reset-password'
					element={
						<ProtectedRouteElement
							onlyUnAuth={true}
							element={<ResetPasswordPage />}
						/>
					}
				/>

				<Route
					path='/profile'
					element={
						<ProtectedRouteElement
							onlyUnAuth={false}
							element={<ProfilePage />}
						/>
					}>
					<Route path="/profile" element={<ProfileUserPage />} />
					<Route path=':orders' element={<ProfileOrdersHistory />} />
				</Route>
				<Route
					path='/profile/orders/:id'
					element={
						<ProtectedRouteElement
							onlyUnAuth={false}
							element={<FeedOrderDetailsPage />}
						/>
					}
				/>
				<Route path='/ingredients/:id' element={<IngredientPage />} />
				<Route path='/feed/:id' element={<FeedOrderDetailsPage />} />
				<Route
					path='/order'
					element={
						<ProtectedRouteElement
							onlyUnAuth={false}
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
							<ProtectedRouteElement
								onlyUnAuth={false}
								element={
									<Modal isOpen={true} onClose={hideOrder}>
										<OrderDetails />
									</Modal>
								}
							/>
						}
					/>
					<Route
						path='/feed/:id'
						element={
							<Modal
								isOpen={true}
								onClose={() => navigate(-1)}
								header='Детали заказа'>
								<FeedOrderDetails />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:id'
						element={
							<ProtectedRouteElement
								onlyUnAuth={false}
								element={
									<Modal
										isOpen={true}
										onClose={() => navigate(-1)}
										header='Детали заказа'>
										<FeedOrderDetails />
									</Modal>
								}
							/>
						}
					/>
				</Routes>
			)}
		</DndProvider>
	);
};
export { App };
