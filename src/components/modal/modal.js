import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect } from 'react';
import ModalOverplay from '../modal-overplay/modal-overplay';
import PropTypes from 'prop-types';

function Modal({ isOpen, onClose, children, header }) {
	if (!isOpen) return null;
	useEffect(() => {
		const handleKeyDown = (event) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	return ReactDOM.createPortal(
		<>
			<div className={styles.container} onClick={(e) => e.stopPropagation()}>
				<div className={styles.headerBlock}>
					<h2 className='text text_type_main-large'>{header}</h2>
					<div className={styles.closeBtn}>
						<CloseIcon onClick={onClose} type='primary' />
					</div>
				</div>
				{children}
			</div>
			<ModalOverplay onClose={onClose} />
		</>,
		document.getElementById('modal')
	);
}

Modal.propTypes = {
	isOpen: PropTypes.bool.isRequired,
	onClose: PropTypes.func.isRequired,
	children: PropTypes.node,
	header: PropTypes.string,
};

export default Modal;
