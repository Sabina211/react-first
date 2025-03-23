import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { getUser } from '../../services/reducers/user';

export const ElementForAuthorized = ({ element }) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { isLoading, isFailed, isAuth } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (isLoading) return <h1>Пожайлуста, подождите ...</h1>;
	if (isFailed || (!isLoading && !isAuth))
		return <Navigate to='/login' state={{ path: location }} replace />;
	return element;
};

ElementForAuthorized.propTypes = {
	element: PropTypes.element,
};
