import styles from './modal-overplay.module.css';
import { useEffect } from 'react';

function ModalOverplay({onClose}) {
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
	return (<div className={styles.modalOverplay} onClick={onClose}></div>);
}

export default ModalOverplay;
