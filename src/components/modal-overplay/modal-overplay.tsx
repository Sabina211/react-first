import styles from './modal-overplay.module.css';
import { FC } from 'react';

type ModalOverplayProps = {
	onClose: () => void;
};

const ModalOverplay: FC<ModalOverplayProps> = ({ onClose }) => {
	return <div className={styles.modalOverplay} onClick={onClose}></div>;
};

export default ModalOverplay;
