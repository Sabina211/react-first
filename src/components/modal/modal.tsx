import ReactDOM from 'react-dom';
import styles from './modal.module.css';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useEffect, FC, ReactNode } from 'react';
import ModalOverplay from '../modal-overplay/modal-overplay';

type ModalProps = {
	isOpen: boolean;
	onClose: () => void;
	children?: ReactNode;
	header?: string;
};


const Modal: FC<ModalProps> = ({ isOpen, onClose, children, header }) => {
	if (!isOpen) return null;
	useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleKeyDown);
		return () => {
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [onClose]);

	const modalRoot = document.getElementById('modal');
	if (!modalRoot) return null;

	return ReactDOM.createPortal(
		<>
			<div className={styles.container} onClick={(e) => e.stopPropagation()} data-testid='modal'>
				<div className={styles.headerBlock}>
					<h2 className={`${styles.header} text text_type_main-large`}>{header}</h2>
					<div className={styles.closeBtn} data-testid='modal-close'>
						<CloseIcon onClick={onClose} type='primary' />
					</div>
				</div>
				{children}
			</div>
			<ModalOverplay onClose={onClose} />
		</>,
		modalRoot
	);
}


export default Modal;
