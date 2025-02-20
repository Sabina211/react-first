import styles from './modal-overplay.module.css';
import PropTypes from 'prop-types';

function ModalOverplay({ onClose }) {
	return <div className={styles.modalOverplay} onClick={onClose}></div>;
}

ModalOverplay.propsType = {
	onClose: PropTypes.func.isRequired,
};

export default ModalOverplay;
