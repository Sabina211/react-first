import { Navigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, FC, ReactElement } from 'react';
import { getUser } from '../../services/reducers/user';
import styles from './element-for-unauthorized.module.css';
import type { RootState, AppDispatch } from '../../store/store';

type ElementForUnauthorizedProps = {
	element: ReactElement;
};

export const ElementForUnauthorized: FC<ElementForUnauthorizedProps> = ({ element }) => {
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();

	const { isLoading, isAuth} = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (isLoading) return <h1 className={styles.loader}>Пожайлуста, подождите ...</h1>;
	if (!isLoading && isAuth)
		return <Navigate to={location.state?.path || '/'} replace />;
	return element;
};
