import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { User } from '@services/reducers/user';

type Props = {
	element: JSX.Element;
	onlyUnAuth: boolean;
};

const ProtectedRouteElement = ({
	element,
	onlyUnAuth = false,
}: Props): React.JSX.Element => {
	const isAuthChecked = useSelector((state) => state.user.isAuthChecked);
	const user = useSelector((state) => state.user.user) as User | null;
	const location = useLocation();

	console.log('isAuthChecked:', isAuthChecked);
	console.log('user:', user);
	console.log('location:', location);

	if (!isAuthChecked) {
		return <div>Ждите...</div>;
	}

	// Пользователь авторизован, но роут предназначен для неавторизованного пользователя
	// Делаем редирект на главную страницу или на тот адрес, что записан в location.state.from
	if (onlyUnAuth && user) {
		if (location.state?.from?.pathname === '/order') {
			return <Navigate to='/' replace />;
		}
		const { from } = location.state || { from: { pathname: '/' } };
		return <Navigate to={from} />;
	}

	// !onlyUnAuth && user Пользователь авторизован и роут для авторизованного пользователя
	if (!onlyUnAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return element;
};

export default ProtectedRouteElement;