import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, FC } from 'react';
import { getUser } from '../../services/reducers/user';
import styles from './element-for-authorized.module.css';
import { ReactElement } from 'react';
import { RootState, AppDispatch } from '../../store/store';

interface ElementForAuthorizedProps {
	element: ReactElement;
	path?: string;
}

export const ElementForAuthorized: FC<ElementForAuthorizedProps> = ({ element }) => {
	const dispatch = useDispatch<AppDispatch>();
	const location = useLocation();

	const { isLoading, isFailed, isAuth } = useSelector((state: RootState) => state.user);

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (isLoading) return <h1 className={styles.loader}>Пожайлуста, подождите ...</h1>;
	if (isFailed || (!isLoading && !isAuth))
		return <Navigate to='/login' state={{ path: location }} />;
	return element;
};

