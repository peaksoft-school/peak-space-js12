import { ReactNode } from 'react';
import scss from './Modal.module.scss';
interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
	return (
		<div>
			{isOpen && (
				<div onClick={() => onClose} className={scss.modalOverlay}>
					<div className={scss.modal}>{children}</div>
				</div>
			)}
		</div>
	);
};

export default Modal;
