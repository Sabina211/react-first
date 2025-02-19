import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import ModalOverplay from '../modal-overplay/modal-overplay';

function Modal({ isOpen, onClose, children, header }) {
	if (!isOpen) return null;

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

export default Modal;
