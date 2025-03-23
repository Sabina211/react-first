import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getUser } from '../../services/reducers/user';
import styles from './element-for-unauthorized.module.css';

export const ElementForUnauthorized = ({ element }) => {
	const dispatch = useDispatch();
	const location = useLocation();

	const { isLoading, isAuth} = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (isLoading) return <h1 className={styles.loader}>Пожайлуста, подождите ...</h1>;
	if (!isLoading && isAuth)
		return <Navigate to={location.state?.path || '/'} replace />;
	return element;
};

ElementForUnauthorized.propTypes = {
	element: PropTypes.element,
};
