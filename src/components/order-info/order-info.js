import ReactDOM from 'react-dom';

function OrderInfo({ isOpen }) {
	if (!isOpen) return null;

	return ReactDOM.createPortal(
		<div className='modal-overlay' >
			<div className='modal-content' onClick={(e) => e.stopPropagation()}>
				"Модалка"
			</div>
		</div>,
		document.getElementById('modal')
	);
}

 export default OrderInfo;
