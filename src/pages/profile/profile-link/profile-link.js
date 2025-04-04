import styles from './profile-link.module.css';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const ProfileLink = ({ onClick, text, path }) => {

    return (
        <NavLink
            end
            to={path}
            onClick={onClick}
            className={({ isActive }) =>
                `text text_type_main-medium ${styles.link} p-4 ${isActive ? styles.active : ''}`
            }>
            <p>{text}</p>
        </NavLink>
    )
}

ProfileLink.propTypes = {
    path: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    text: PropTypes.string.isRequired,
};

export default ProfileLink;