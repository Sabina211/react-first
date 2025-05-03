import styles from './profile-link.module.css';
import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';

interface ProfileLinkProps {
	path: string;
	onClick?: () => void;
	text: string;
}

const ProfileLink: FC<ProfileLinkProps> = ({ onClick, text, path }) => {
	return (
		<NavLink
			end
			to={path}
			onClick={onClick}
			className={({ isActive }) =>
				`text text_type_main-medium ${styles.link} p-4 ${
					isActive ? styles.active : ''
				}`
			}>
			<p>{text}</p>
		</NavLink>
	);
};

export default ProfileLink;
